import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, Container, Typography, Breadcrumbs, 
  Divider, Link as MuiLink 
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function PrivacyPolicy() {
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
              Kebijakan Privasi
            </Typography>
          </Breadcrumbs>
          
          <Typography variant="h3" fontWeight={800} color="#111827" sx={{ letterSpacing: '-0.02em', mb: 1, fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Kebijakan Privasi
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
              1. Pendahuluan
            </Typography>
            <Typography variant="body1" color="#4B5563" sx={{ lineHeight: 1.8 }}>
              Selamat datang di Dibitech. Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi yang Anda bagikan. Dokumen Kebijakan Privasi ini menjelaskan praktik yang kami lakukan mengenai pengumpulan, penggunaan, dan pengungkapan informasi Anda ketika Anda menggunakan platform dan layanan kami.
            </Typography>
          </Box>

          <Box component="section">
            <Typography variant="h5" fontWeight={700} color="#111827" sx={{ mb: 2 }}>
              2. Informasi yang Kami Kumpulkan
            </Typography>
            <Typography variant="body1" color="#4B5563" sx={{ lineHeight: 1.8, mb: 1.5 }}>
              Dalam rangka menyediakan layanan terbaik, kami mengumpulkan beberapa jenis informasi dari pengguna:
            </Typography>
            <Box component="ul" sx={{ color: '#4B5563', lineHeight: 1.8, pl: 3, m: 0 }}>
              <li style={{ paddingBottom: '4px' }}><strong>Informasi Profil:</strong> Nama, alamat email, dan kredensial akun saat Anda mendaftar.</li>
              <li style={{ paddingBottom: '4px' }}><strong>Informasi Transaksi:</strong> Data histori pesanan dan riwayat unduhan (kami menggunakan layanan pihak ketiga untuk pembayaran dan tidak menyimpan data sensitif kartu Anda).</li>
              <li><strong>Data Penggunaan Otomatis:</strong> Informasi teknis dasar seperti IP Address, jenis peramban (browser), dan waktu akses yang dikumpulkan melalui cookies untuk keperluan analitik.</li>
            </Box>
          </Box>

          <Box component="section">
            <Typography variant="h5" fontWeight={700} color="#111827" sx={{ mb: 2 }}>
              3. Bagaimana Kami Menggunakan Informasi Anda
            </Typography>
            <Typography variant="body1" color="#4B5563" sx={{ lineHeight: 1.8, mb: 1.5 }}>
              Informasi yang telah dikumpulkan digunakan semata-mata untuk tujuan operasional dan peningkatan kualitas platform, antara lain:
            </Typography>
            <Box component="ul" sx={{ color: '#4B5563', lineHeight: 1.8, pl: 3, m: 0 }}>
              <li style={{ paddingBottom: '4px' }}>Memfasilitasi transaksi dan memberikan akses ke produk digital yang dibeli.</li>
              <li style={{ paddingBottom: '4px' }}>Memberikan dukungan pelanggan dan menyelesaikan kendala teknis.</li>
              <li style={{ paddingBottom: '4px' }}>Meningkatkan performa antarmuka pengguna berdasarkan data analitik yang anonim.</li>
              <li>Mengirimkan informasi penting terkait pembaruan layanan, faktur, atau perubahan ketentuan.</li>
            </Box>
          </Box>

          <Box component="section">
            <Typography variant="h5" fontWeight={700} color="#111827" sx={{ mb: 2 }}>
              4. Perlindungan dan Keamanan Data
            </Typography>
            <Typography variant="body1" color="#4B5563" sx={{ lineHeight: 1.8 }}>
              Kami mengambil langkah-langkah yang wajar untuk mengamankan data pribadi pengguna dari akses, modifikasi, atau penghancuran yang tidak sah. Seluruh lalu lintas data di platform kami dilindungi oleh enkripsi standar industri (HTTPS/TLS). Meskipun kami berusaha sebaik mungkin, tidak ada metode transmisi di internet yang 100% aman, sehingga kami tidak dapat menjamin keamanan mutlak.
            </Typography>
          </Box>

          <Divider sx={{ my: 2, borderColor: '#E5E7EB' }} />

          <Box component="section">
            <Typography variant="h5" fontWeight={700} color="#111827" sx={{ mb: 2 }}>
              5. Pengungkapan kepada Pihak Ketiga
            </Typography>
            <Typography variant="body1" color="#4B5563" sx={{ lineHeight: 1.8 }}>
              Dibitech tidak menjual, menyewakan, maupun memperdagangkan informasi identitas pribadi pengguna kepada pihak ketiga. Kami hanya membagikan informasi dalam kapasitas yang sangat terbatas kepada mitra tepercaya yang membantu kami dalam mengoperasikan situs web dan melayani transaksi pembayaran Anda, selama pihak-pihak tersebut setuju untuk merahasiakan informasi ini.
            </Typography>
          </Box>

          <Box component="section">
            <Typography variant="h5" fontWeight={700} color="#111827" sx={{ mb: 2 }}>
              6. Hubungi Kami
            </Typography>
            <Typography variant="body1" color="#4B5563" sx={{ lineHeight: 1.8, mb: 2 }}>
              Jika Anda memiliki pertanyaan lebih lanjut, masukan, maupun kekhawatiran terkait Kebijakan Privasi ini, Anda dipersilakan untuk menghubungi kami kapan saja.
            </Typography>
            <Typography variant="body1" sx={{ color: '#111827', fontWeight: 600 }}>
              Email: privacy@dibitech.com
            </Typography>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}
