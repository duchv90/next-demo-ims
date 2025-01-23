import { isStringEmpty } from '@/utils/stringHelpers';
import * as AntdIcons from '@ant-design/icons';

export default function AntdIcon({
  name,
  ...props
}: Readonly<{ name: string } & React.HTMLProps<HTMLDivElement>>) {
  let IconComponent: any = null; // eslint-disable-line

  if (name && !isStringEmpty(name)) {
    const icon = name as keyof typeof AntdIcons;
    IconComponent = AntdIcons[icon];
  }

  return <>{IconComponent && <IconComponent {...props} />}</>;
}
