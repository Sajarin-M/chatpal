import { useNavigate } from 'react-router-dom';
import { Tabs as MTabs, TabsProps as MTabsProps, TabsListProps } from '@mantine/core';

export type TabRoute = {
  to: string;
  label: string;
};

export type TabProps = Omit<MTabsProps, 'value' | 'onTabChange' | 'children'> & {
  routes: TabRoute[];
  listProps?: Omit<TabsListProps, 'children'>;
};

export default function Tabs({ routes, listProps, ...rest }: TabProps) {
  const navigate = useNavigate();
  const locationPathname = location.pathname.toLowerCase();

  const activeTab = routes.find((route) => locationPathname.includes(route.to.toLowerCase()));

  return (
    <MTabs value={activeTab?.to} onTabChange={(value) => navigate(value as string)} {...rest}>
      <MTabs.List {...listProps}>
        {routes.map((route) => (
          <MTabs.Tab key={route.to} value={route.to}>
            {route.label}
          </MTabs.Tab>
        ))}
      </MTabs.List>
    </MTabs>
  );
}
