import { AppMessageListener } from '~/hooks/bridge/useAppMessage';

export default function AddShare() {
  return (
    <AppMessageListener
      targetType="YgtangAppShareData"
      handler={({ type, data }) => {
        console.log('type: ', type, ' data: ', data);
      }}
    ></AppMessageListener>
  );
}
