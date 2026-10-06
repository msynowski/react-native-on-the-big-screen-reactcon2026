import { useEffect, useRef } from 'react';
import { findNodeHandle, Pressable, type PressableProps, type View } from 'react-native';

import { useFocusStore, type FocusableModel } from './store';

type Props = PressableProps & {
  model: FocusableModel;
};

export function Focusable({ model, onFocus, ...rest }: Props) {
  const ref = useRef<View>(null);

  useEffect(() => {
    const { register, unregister } = useFocusStore.getState();

    register({ ref, nodeHandle: findNodeHandle(ref.current), model });

    return () => unregister(model.id);
  }, [model]);

  return (
    <Pressable
      {...rest}
      ref={ref}
      onFocus={(event) => {
        useFocusStore.getState().setFocused(model.id);
        onFocus?.(event);
      }}
    />
  );
}
