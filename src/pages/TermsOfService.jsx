import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, Container, Typography, Breadcrumbs, 
  Divider, Link as MuiLink 
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function TermsOfService() {
  const lastUpdated = "20 Juli 2026";

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', pb: 12 }}>
      {/* Page Header */}
      <Box sx={{ bgcolor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', py: { xs: 4, md: 6 } }}>
        <Container maxWidth="md">
          <Breadcrumbs 
            separator={<NavigateNextIcon fontSize="small" />} 
            aria-label="breadcrumb"
            sx={{ mb: 2, '& .MuiBreadcrumbs-separator': { color: '#9CA3AF' } }}
          >
            <MuiLink component={Link} to="/" underline="hover" color="#6B7280" sx={{ fontSize: '0.875rem' }}>
              Beranda
            </MuiLink>
            <Typography color="#111827" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
              Syarat & Ketentuan
            </Typography>
          </Breadcrumbs>
          
          <Typography variant="h3" fontWeight={800} color="#111827" sx={{ letterSpacing: '-0.02em', mb: 1, fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Syarat & Ketentuan
          </Typography>
          <Typography variant="body1" color="#6B7280">
            Terakhir diperbarui: {lastUpdated}
          </Typography>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="md" sx={{ mt: { xs: 5, md: 8 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          
          <Box component="section">
            <Typography variant="h5" fontWeight={700} color="#111827" sx={{ mb: 2 }}>
              1. Kesepakatan Syarat
            </Typography>
            <Typography variant="body1" color="#4B5563" sx={{ lineHeight: 1.8 }}>
              Dengan mengakses dan menggunakan platform Dibitech, Anda menyetujui untuk terikat dengan Syarat dan Ketentuan ini, seluruh hukum dan peraturan yang berlaku, serta bertanggung jawab penuh atas kepatuhan terhadap hukum lokal Anda. Jika Anda tidak setuju dengan ketentuan ini, Anda dilarang menggunakan platform ini.
            </Typography>
          </Box>

          <Box component="section">
            <Typography variant="h5" fontWeight={700} color="#111827" sx={{ mb: 2 }}>
              2. Lisensi Penggunaan
            </Typography>
            <Typography variant="body1" color="#4B5563" sx={{ lineHeight: 1.8, mb: 1.5 }}>
              Produk digital (termasuk template UI, komponen, dan source code) yang tersedia di platform kami dilisensikan, bukan dijual. Berdasarkan lisensi yang diberikan, Anda diizinkan untuk:
            </Typography>
            <Box component="ul" sx={{ color: '#4B5563', lineHeight: 1.8, pl: 3, m: 0 }}>
              <li style={{ paddingBottom: '4px' }}>Menggunakan aset digital dalam proyek pribadi maupun komersial.</li>
              <li style={{ paddingBottom: '4px' }}>Memodifikasi source code sesuai dengan kebutuhan proyek Anda.</li>
            </Box>
            <Typography variant="body1" color="#4B5563" sx={{ lineHeight: 1.8, mt: 1.5, mb: 1.5 }}>
              Namun, Anda secara tegas dilarang untuk:
            </Typography>
            <Box component="ul" sx={{ color: '#4B5563', lineHeight: 1.8, pl: 3, m: 0 }}>
              <li style={{ paddingBottom: '4px' }}>Mendistribusikan ulang, menjual, atau menyewakan aset digital aslinya kepada pihak ketiga tanpa lisensi khusus.</li>
              <li>Mengklaim source code atau desain aslinya sebagai hasil karya Anda sendiri tanpa modifikasi yang signifikan.</li>
            </Box>
          </Box>

          <Box component="section">
            <Typography variant="h5" fontWeight={700} color="#111827" sx={{ mb: 2 }}>
              3. Akun Pengguna
            </Typography>
            <Typography variant="body1" color="#4B5563" sx={{ lineHeight: 1.8 }}>
              Ketika Anda membuat akun di Dibitech, Anda harus memberikan informasi yang akurat, lengkap, dan terkini setiap saat. Kegagalan dalam melakukan hal tersebut merupakan pelanggaran ketentuan, yang dapat mengakibatkan penghentian segera akun Anda di platform kami. Anda bertanggung jawab untuk melindungi kata sandi yang Anda gunakan dan untuk aktivitas atau tindakan apa pun di bawah kata sandi Anda.
            </Typography>
          </Box>

          <Box component="section">
            <Typography variant="h5" fontWeight={700} color="#111827" sx={{ mb: 2 }}>
              4. Transaksi dan Pembayaran
            </Typography>
            <Typography variant="body1" color="#4B5563" sx={{ lineHeight: 1.8 }}>
              Semua harga tercantum dalam mata uang Rupiah (IDR) kecuali disebutkan lain. Kami menggunakan penyedia layanan pembayaran pihak ketiga yang aman. Dibitech tidak menyimpan informasi kartu kredit Anda. Semua penjualan aset digital bersifat final. Pengembalian dana (refund) hanya dipertimbangkan apabila produk yang diunduh terbukti rusak secara fatal atau tidak sesuai sama sekali dengan deskripsi produk yang dicantumkan.
            </Typography>
          </Box>

          <Divider sx={{ my: 2, borderColor: '#E5E7EB' }} />

          <Box component="section">
            <Typography variant="h5" fontWeight={700} color="#111827" sx={{ mb: 2 }}>
              5. Penolakan Tanggung Jawab (Disclaimer)
            </Typography>
            <Typography variant="body1" color="#4B5563" sx={{ lineHeight: 1.8 }}>
              Materi di platform Dibitech disediakan secara "apa adanya" (as is). Dibitech tidak membuat jaminan, tersurat maupun tersirat, dan dengan ini melepaskan serta menolak semua jaminan lain, termasuk namun tidak terbatas pada, jaminan tersirat terkait kelayakan untuk diperdagangkan atau kesesuaian untuk tujuan tertentu.
            </Typography>
          </Box>

          <Box component="section">
            <Typography variant="h5" fontWeight={700} color="#111827" sx={{ mb: 2 }}>
              6. Perubahan Syarat
            </Typography>
            <Typography variant="body1" color="#4B5563" sx={{ lineHeight: 1.8, mb: 2 }}>
              Dibitech berhak merevisi Syarat dan Ketentuan ini kapan saja tanpa pemberitahuan sebelumnya. Dengan menggunakan situs web ini, Anda setuju untuk terikat dengan versi terbaru dari Syarat dan Ketentuan Penggunaan ini.
            </Typography>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}
