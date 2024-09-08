import ContentBlock from '@/components/content-block';
import PetDetail from '@/components/pet-detail';
import PetList from '@/components/pet-list';
import SearchForm from '@/components/search-form';
import Stats from '@/components/stats';
import usePetContext from '@/hooks/use-pet-context';

export default async function Page() {
  return (
    <div className="flex h-full flex-col py-4">
      <Stats />
      <section className="mt-4 grid flex-1 grid-rows-[45px_300px_500px] gap-3 md:grid-cols-3 md:grid-rows-[45px_1fr]">
        <div className="md:col-span-1 md:col-start-1 md:row-span-1 md:row-start-1">
          <SearchForm />
        </div>

        <div className="md:col-span-1 md:col-start-1 md:row-span-full md:row-start-2">
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>

        <div className="md:col-span-full md:col-start-2 md:row-span-full md:row-start-1">
          <ContentBlock>
            <PetDetail />
          </ContentBlock>
        </div>
      </section>
    </div>
  );
}
