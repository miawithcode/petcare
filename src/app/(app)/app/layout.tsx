import AppHeader from '@/components/app-header';
import Footer from '@/components/footer';
import Container from '@/components/layout/container';
import { Toaster } from '@/components/ui/sonner';
import PetContextProvider from '@/contexts/pet-context-provider';
import SearchContextProvider from '@/contexts/search-context-provider';
import prisma from '@/lib/db';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pets = await prisma.pet.findMany();

  return (
    <Container className="relative flex h-svh min-h-svh flex-col">
      <AppHeader />

      <SearchContextProvider>
        <PetContextProvider data={pets}>
          <main className="relative flex-1">{children}</main>
        </PetContextProvider>
      </SearchContextProvider>

      <Footer />
      <Toaster position="top-right" />
    </Container>
  );
}
