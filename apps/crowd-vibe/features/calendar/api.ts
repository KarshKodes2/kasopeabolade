import { google } from 'googleapis';
import type { CalendarEvent } from './types';

function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google-calendar/callback`
  );
}

export function getAuthorizationUrl(tenantId: string) {
  const client = getOAuthClient();
  return client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/calendar.events',
      'https://www.googleapis.com/auth/calendar.readonly',
    ],
    state: tenantId,
  });
}

export async function exchangeCodeForTokens(code: string) {
  const client = getOAuthClient();
  const { tokens } = await client.getToken(code);
  return tokens;
}

export async function createCalendarEvent(
  accessToken: string,
  refreshToken: string,
  calendarId: string,
  event: CalendarEvent
): Promise<string | null> {
  const client = getOAuthClient();
  client.setCredentials({ access_token: accessToken, refresh_token: refreshToken });

  const calendar = google.calendar({ version: 'v3', auth: client });

  const attendees = event.attendeeEmail
    ? [{ email: event.attendeeEmail }]
    : [];

  const response = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: event.summary,
      description: event.description,
      location: event.location,
      start: { dateTime: event.startDateTime, timeZone: 'Africa/Lagos' },
      end: { dateTime: event.endDateTime, timeZone: 'Africa/Lagos' },
      attendees,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 60 },
        ],
      },
    },
  });

  return response.data.id ?? null;
}

export async function deleteCalendarEvent(
  accessToken: string,
  refreshToken: string,
  calendarId: string,
  eventId: string
): Promise<void> {
  const client = getOAuthClient();
  client.setCredentials({ access_token: accessToken, refresh_token: refreshToken });
  const calendar = google.calendar({ version: 'v3', auth: client });
  await calendar.events.delete({ calendarId, eventId });
}
