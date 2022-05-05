import AppendButton from '~/components/home/AppendButton';
import ContentHeader from '~/components/home/ContentHeader';
import ContentView from '~/components/home/ContentView';

export default function Root() {
  return (
    <article>
      <ContentHeader />
      <ContentView />
      <AppendButton />
    </article>
  );
}
