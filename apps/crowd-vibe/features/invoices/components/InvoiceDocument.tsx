import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import type { InvoiceData } from '../types';

const styles = StyleSheet.create({
  page: { padding: 48, fontFamily: 'Helvetica', backgroundColor: '#0a0a0a', color: '#ffffff', fontSize: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  brand: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: '#7C3AED' },
  brandSub: { fontSize: 9, color: '#ffffff80', marginTop: 3 },
  invoiceLabel: { fontSize: 9, color: '#ffffff50', textAlign: 'right' },
  invoiceNumber: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#ffffff', textAlign: 'right' },
  invoiceDate: { fontSize: 9, color: '#ffffff50', textAlign: 'right', marginTop: 3 },
  divider: { borderBottom: 1, borderColor: '#ffffff18', marginVertical: 20 },
  row2col: { flexDirection: 'row', gap: 24, marginBottom: 28 },
  col: { flex: 1 },
  sectionLabel: { fontSize: 8, color: '#ffffff40', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  fieldLabel: { fontSize: 8, color: '#ffffff50', marginBottom: 2 },
  fieldValue: { fontSize: 10, color: '#ffffff', marginBottom: 6 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#ffffff0d', padding: '8 12', borderRadius: 4, marginBottom: 2 },
  tableRow: { flexDirection: 'row', padding: '10 12', borderBottom: 1, borderColor: '#ffffff0d' },
  tableDesc: { flex: 3, color: '#ffffff' },
  tableAmt: { flex: 1, textAlign: 'right', color: '#ffffff' },
  tableHeaderText: { fontSize: 8, color: '#ffffff50', fontFamily: 'Helvetica-Bold' },
  totalsBox: { marginTop: 16, padding: 16, backgroundColor: '#ffffff08', borderRadius: 6 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  totalLabel: { color: '#ffffff60' },
  totalValue: { color: '#ffffff' },
  grandRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: 1, borderColor: '#ffffff20' },
  grandLabel: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#ffffff' },
  grandValue: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#7C3AED' },
  footer: { marginTop: 48, textAlign: 'center', color: '#ffffff30', fontSize: 8 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#7C3AED26', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, marginBottom: 16 },
  badgeText: { color: '#7C3AED', fontSize: 8, fontFamily: 'Helvetica-Bold' },
});

export function InvoiceDocument({ data }: { data: InvoiceData }) {
  const currency = '₦';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>{data.tenantName}</Text>
            <Text style={styles.brandSub}>Entertainment Services</Text>
            {data.tenantLocation && <Text style={[styles.brandSub, { marginTop: 6 }]}>{data.tenantLocation}</Text>}
          </View>
          <View>
            <Text style={styles.invoiceLabel}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>{data.invoiceNumber}</Text>
            <Text style={styles.invoiceDate}>Issued: {data.issueDate}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Billed to / Event details */}
        <View style={styles.row2col}>
          <View style={styles.col}>
            <Text style={styles.sectionLabel}>Billed To</Text>
            <Text style={styles.fieldValue}>{data.clientName}</Text>
            <Text style={[styles.fieldValue, { color: '#ffffff80' }]}>{data.clientEmail}</Text>
            <Text style={[styles.fieldValue, { color: '#ffffff80' }]}>{data.clientPhone}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.sectionLabel}>Event Details</Text>
            <View>
              <Text style={styles.fieldLabel}>Type</Text>
              <Text style={styles.fieldValue}>{data.eventType.replace(/_/g, ' ')}</Text>
            </View>
            <View>
              <Text style={styles.fieldLabel}>Date &amp; Time</Text>
              <Text style={styles.fieldValue}>{data.eventDate} at {data.startTime}</Text>
            </View>
            <View>
              <Text style={styles.fieldLabel}>Venue</Text>
              <Text style={styles.fieldValue}>{data.venue}</Text>
            </View>
          </View>
        </View>

        {/* Line items */}
        <View>
          <Text style={styles.sectionLabel}>Services</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 3 }]}>Description</Text>
            <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>Amount</Text>
          </View>
          {data.services.map((svc, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableDesc}>{svc.replace(/_/g, ' ')}</Text>
              <Text style={styles.tableAmt}>Included</Text>
            </View>
          ))}
          <View style={styles.tableRow}>
            <Text style={styles.tableDesc}>Performance Fee</Text>
            <Text style={styles.tableAmt}>{currency}{data.basePrice.toLocaleString()}</Text>
          </View>
        </View>

        {/* Totals */}
        <View style={styles.totalsBox}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{currency}{data.basePrice.toLocaleString()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Deposit due now</Text>
            <Text style={styles.totalValue}>{currency}{data.depositAmount.toLocaleString()}</Text>
          </View>
          <View style={styles.grandRow}>
            <Text style={styles.grandLabel}>Total</Text>
            <Text style={styles.grandValue}>{currency}{data.totalPrice.toLocaleString()}</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Thank you for choosing {data.tenantName}. This invoice is generated automatically by CrowdVibe.
        </Text>
      </Page>
    </Document>
  );
}
