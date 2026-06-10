import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function InvoiceModal({ invoice, onClose }) {
  const printRef = useRef();
  const { lang } = useLanguage();

  if (!invoice) return null;

  const handlePrint = () => {
    const content = printRef.current;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoice.invoiceNumber}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', sans-serif; color: #1e293b; padding: 20px; max-width: 380px; margin: 0 auto; }
          .header { text-align: center; border-bottom: 2px dashed #cbd5e1; padding-bottom: 16px; margin-bottom: 16px; }
          .store-name { font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 800; color: #16a34a; }
          .tagline { font-size: 11px; color: #64748b; margin-top: 4px; }
          .invoice-info { font-size: 11px; color: #475569; margin-top: 12px; }
          .invoice-info div { margin: 2px 0; }
          .invoice-num { font-weight: 700; font-size: 13px; color: #1e293b; }
          .customer { background: #f8fafc; border-radius: 8px; padding: 10px; margin: 12px 0; font-size: 12px; }
          .customer strong { color: #1e293b; }
          table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 11px; }
          th { background: #16a34a; color: white; padding: 8px 6px; text-align: left; font-weight: 600; font-size: 10px; text-transform: uppercase; }
          th:last-child, td:last-child { text-align: right; }
          th:nth-child(3), td:nth-child(3) { text-align: center; }
          td { padding: 7px 6px; border-bottom: 1px solid #e2e8f0; }
          .totals { border-top: 2px dashed #cbd5e1; padding-top: 12px; margin-top: 8px; }
          .total-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 12px; }
          .total-row.grand { font-size: 16px; font-weight: 800; color: #16a34a; border-top: 2px solid #16a34a; padding-top: 8px; margin-top: 8px; }
          .footer { text-align: center; border-top: 2px dashed #cbd5e1; padding-top: 16px; margin-top: 16px; }
          .thank-you { font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700; color: #16a34a; }
          .footer-text { font-size: 10px; color: #94a3b8; margin-top: 8px; line-height: 1.5; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        ${content.innerHTML}
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const handleDownloadPDF = () => {
    handlePrint();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white dark:bg-surface-800 rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-700">
            <h2 className="text-lg font-bold text-surface-800 dark:text-white font-[var(--font-heading)]">
              {lang === 'ta' ? 'பில் முன்னோட்டம்' : 'Invoice Preview'}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="p-2 rounded-xl bg-primary-500/10 text-primary-600 hover:bg-primary-500/20 transition-colors"
                title="Print Invoice"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownloadPDF}
                className="p-2 rounded-xl bg-accent-500/10 text-accent-600 hover:bg-accent-500/20 transition-colors"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                <X className="w-4 h-4 text-surface-500" />
              </button>
            </div>
          </div>

          {/* Invoice Content (scrollable) */}
          <div className="overflow-y-auto flex-1 p-5">
            <div ref={printRef}>
              {/* Store Header */}
              <div className="header" style={{ textAlign: 'center', borderBottom: '2px dashed #cbd5e1', paddingBottom: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px' }}>🏪</div>
                </div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: '800', color: '#16a34a' }}>
                  {lang === 'ta' ? 'KCP மளிகை' : 'KCP Maligai'}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                  {lang === 'ta' ? 'உங்களுக்கு பிடித்த அக்கம் பக்கத்து மளிகை கடை' : 'Your Trusted Neighborhood Grocery Store'}
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>
                  {lang === 'ta' ? '123, மெயின் ரோடு, அண்ணா நகர், சென்னை - 600040' : '123, Main Road, Anna Nagar, Chennai - 600040'}
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                  Ph: +91 99424 24050 | GST: 33AABCT1234F1ZQ
                </div>

                <div style={{ marginTop: '14px', fontSize: '11px', color: '#475569' }}>
                  <div style={{ fontWeight: '700', fontSize: '13px', color: '#1e293b' }}>
                    {lang === 'ta' ? 'இன்வாய்ஸ் எண்' : 'Invoice No'}: {invoice.invoiceNumber}
                  </div>
                  <div style={{ marginTop: '4px' }}>
                    {lang === 'ta' ? 'தேதி' : 'Date'}: {invoice.date} | {lang === 'ta' ? 'நேரம்' : 'Time'}: {invoice.time}
                  </div>
                </div>
              </div>

              {/* Customer */}
              {(invoice.customer.name || invoice.customer.mobile) && (
                <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '10px', margin: '12px 0', fontSize: '12px' }}>
                  {invoice.customer.name && (
                    <div>
                      <strong>{lang === 'ta' ? 'வாடிக்கையாளர்' : 'Customer'}:</strong> {invoice.customer.name}
                    </div>
                  )}
                  {invoice.customer.mobile && (
                    <div>
                      <strong>{lang === 'ta' ? 'கைபேசி' : 'Mobile'}:</strong> {invoice.customer.mobile}
                    </div>
                  )}
                </div>
              )}

              {/* Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', margin: '12px 0', fontSize: '11px' }}>
                <thead>
                  <tr>
                    <th style={{ background: '#16a34a', color: 'white', padding: '8px 6px', textAlign: 'left', fontWeight: '600', fontSize: '10px', textTransform: 'uppercase' }}>#</th>
                    <th style={{ background: '#16a34a', color: 'white', padding: '8px 6px', textAlign: 'left', fontWeight: '600', fontSize: '10px', textTransform: 'uppercase' }}>
                      {lang === 'ta' ? 'பொருள்' : 'Item'}
                    </th>
                    <th style={{ background: '#16a34a', color: 'white', padding: '8px 6px', textAlign: 'center', fontWeight: '600', fontSize: '10px', textTransform: 'uppercase' }}>
                      {lang === 'ta' ? 'அளவு' : 'Qty'}
                    </th>
                    <th style={{ background: '#16a34a', color: 'white', padding: '8px 6px', textAlign: 'right', fontWeight: '600', fontSize: '10px', textTransform: 'uppercase' }}>
                      {lang === 'ta' ? 'விலை' : 'Rate'}
                    </th>
                    <th style={{ background: '#16a34a', color: 'white', padding: '8px 6px', textAlign: 'right', fontWeight: '600', fontSize: '10px', textTransform: 'uppercase' }}>
                      {lang === 'ta' ? 'தொகை' : 'Amount'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, i) => (
                    <tr key={item.id}>
                      <td style={{ padding: '7px 6px', borderBottom: '1px solid #e2e8f0', fontSize: '11px' }}>{i + 1}</td>
                      <td style={{ padding: '7px 6px', borderBottom: '1px solid #e2e8f0', fontSize: '11px' }}>
                        {lang === 'ta' && item.nameTamil ? item.nameTamil : item.name}
                        <span style={{ display: 'block', fontSize: '9px', color: '#94a3b8' }}>{item.unit}</span>
                      </td>
                      <td style={{ padding: '7px 6px', borderBottom: '1px solid #e2e8f0', fontSize: '11px', textAlign: 'center' }}>{item.quantity}</td>
                      <td style={{ padding: '7px 6px', borderBottom: '1px solid #e2e8f0', fontSize: '11px', textAlign: 'right' }}>₹{item.price}</td>
                      <td style={{ padding: '7px 6px', borderBottom: '1px solid #e2e8f0', fontSize: '11px', textAlign: 'right', fontWeight: '600' }}>₹{item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div style={{ borderTop: '2px dashed #cbd5e1', paddingTop: '12px', marginTop: '8px' }}>
                <div style={{ display: 'flex', justifycontent: 'space-between', justifyContent: 'space-between', padding: '4px 0', fontSize: '12px' }}>
                  <span>
                    {lang === 'ta' ? 'கூட்டுத்தொகை' : 'Subtotal'} ({invoice.totalItems} {lang === 'ta' ? 'பொருட்கள்' : 'items'})
                  </span>
                  <span>₹{invoice.subtotal.toFixed(2)}</span>
                </div>
                {invoice.discountAmount > 0 && (
                  <div style={{ display: 'flex', justifycontent: 'space-between', justifyContent: 'space-between', padding: '4px 0', fontSize: '12px', color: '#16a34a' }}>
                    <span>
                      {lang === 'ta' ? 'தள்ளுபடி' : 'Discount'} ({invoice.discountType === 'percent' ? `${invoice.discountValue}%` : (lang === 'ta' ? 'நிலையானது' : 'Flat')})
                    </span>
                    <span>-₹{invoice.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifycontent: 'space-between', justifyContent: 'space-between', padding: '4px 0', fontSize: '12px' }}>
                  <span>{lang === 'ta' ? 'ஜிஎஸ்டி' : 'GST'} ({invoice.gstRate}%)</span>
                  <span>₹{invoice.gstAmount.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifycontent: 'space-between', justifyContent: 'space-between', padding: '8px 0 0', fontSize: '18px', fontWeight: '800', color: '#16a34a', borderTop: '2px solid #16a34a', marginTop: '8px' }}>
                  <span>{lang === 'ta' ? 'மொத்த தொகை' : 'Grand Total'}</span>
                  <span>₹{invoice.grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Footer */}
              <div style={{ textAlign: 'center', borderTop: '2px dashed #cbd5e1', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', fontWeight: '700', color: '#16a34a' }}>
                  {lang === 'ta' ? 'வருகைக்கு நன்றி! 🙏' : 'Thank You for Shopping! 🙏'}
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '8px', lineHeight: '1.5' }}>
                  {lang === 'ta' ? (
                    <>
                      KCP மளிகைக்கு மீண்டும் வருகை தரவும்<br />
                      திங்கள்-சனி: காலை 7 - இரவு 10 | ஞாயிறு: காலை 8 - இரவு 9<br />
                      kcp7673@gmail.com
                    </>
                  ) : (
                    <>
                      Visit us again at KCP Maligai<br />
                      Open Mon-Sat: 7AM-10PM | Sun: 8AM-9PM<br />
                      kcp7673@gmail.com
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-5 border-t border-surface-200 dark:border-surface-700 flex gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 btn-primary justify-center text-sm py-3"
            >
              <Printer className="w-4 h-4" />
              {lang === 'ta' ? 'பில் அச்சிடு' : 'Print Bill'}
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex-1 btn-secondary justify-center text-sm py-3"
            >
              <Download className="w-4 h-4" />
              {lang === 'ta' ? 'பதிவிறக்கம்' : 'Download PDF'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
