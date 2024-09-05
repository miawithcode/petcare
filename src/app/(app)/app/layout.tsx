import AppHeader from '@/components/app-header';
import Footer from '@/components/footer';
import Container from '@/components/layout/container';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="relative flex h-svh max-w-screen-lg flex-col overflow-hidden">
      <AppHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </Container>
  );
}
