export interface CalendarEvent {
  summary: string;
  description: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  attendeeEmail?: string;
}

export interface GoogleTokens {
  accessToken: string;
  refreshToken: string;
  calendarId?: string;
}
