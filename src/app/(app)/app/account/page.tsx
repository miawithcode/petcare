import ContentBlock from '@/components/content-block';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <ContentBlock className="flex flex-col items-center justify-center gap-2">
      <p>
        Logged in as <span className="font-semibold">example@gmail.com</span>
      </p>
      <Button>Logout</Button>
    </ContentBlock>
  );
}
