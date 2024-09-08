import AppHeader from '@/components/app-header';
import Footer from '@/components/footer';
import Container from '@/components/layout/container';
import PetContextProvider from '@/contexts/pet-context-provider';
import SearchContextProvider from '@/contexts/search-context-provider';
import { API_BASE_URL } from '@/lib/api';
import { type Pet } from '@/lib/types';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await fetch(`${API_BASE_URL}/pets`);
  if (!response.ok) {
    throw new Error('Failed to fetch pets');
  }
  const data: Pet[] = await response.json();

  return (
    <Container className="relative flex h-svh min-h-svh max-w-screen-xl flex-col">
      <AppHeader />

      <SearchContextProvider>
        <PetContextProvider data={data}>
          <main className="relative flex-1">{children}</main>
        </PetContextProvider>
      </SearchContextProvider>
      
      <Footer />
    </Container>
  );
}
