import AppNav from './app-nav';
import Logo from './logo';

export default function AppHeader() {
  return (
    <header className="flex justify-between items-center py-6">
      <Logo />
      <AppNav />
    </header>
  );
}
