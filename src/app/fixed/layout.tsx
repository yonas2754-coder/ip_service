"use client";
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  makeStyles, tokens, shorthands, TabList, Tab, Text, Avatar, Divider, Dropdown, Option, Label 
} from "@fluentui/react-components";
import { AddRegular, ChartMultipleRegular, BookInformationRegular, ShieldLockRegular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  root: { display: 'flex', height: '100vh', backgroundColor: tokens.colorNeutralBackground2 },
  sidebar: { 
    width: '260px', backgroundColor: tokens.colorNeutralBackground1, 
    ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralStroke1),
    display: 'flex', flexDirection: 'column' 
  },
  main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  header: { 
    height: '48px', backgroundColor: tokens.colorNeutralBackground1, 
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke1),
    display: 'flex', alignItems: 'center', padding: '0 24px', justifyContent: 'space-between' 
  },
  content: { padding: '32px', overflowY: 'auto', flex: 1, backgroundColor: tokens.colorNeutralBackground2 }
});

export default function FixedPortalLayout({ children }: { children: React.ReactNode }) {
  const styles = useStyles();
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState('Manager'); // Role Simulation

  const activeTab = pathname.split('/').pop() || 'logging';

  return (
    <div className={styles.root}>
      <aside className={styles.sidebar}>
        <div style={{ padding: '20px' }}>
          <Text weight="bold" size={500} color={tokens.colorBrandForeground1}>IP SERVICE PORTAL</Text>
        </div>
        
        <TabList vertical selectedValue={activeTab} onTabSelect={(_, d) => router.push(`/fixed/${d.value}`)}>
          <Tab value="logging" icon={<AddRegular />}>Workforce Log</Tab>
          {role !== 'Staff' && <Tab value="reports" icon={<ChartMultipleRegular />}>KPI Analysis</Tab>}
          <Tab value="kb" icon={<BookInformationRegular />}>Knowledge Base</Tab>
        </TabList>

        <div style={{ marginTop: 'auto', padding: '20px' }}>
          <Divider />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
            <Avatar name="Admin User" size={32} />
            <div>
              <Text block size={200} weight="semibold">Ethio User</Text>
              <Text block size={100} italic color={tokens.colorNeutralForeground4}>{role}</Text>
            </div>
          </div>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.header}>
          <Text weight="semibold">Service Management</Text>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Label size="small">Simulation Role:</Label>
            <Dropdown size="small" value={role} onOptionSelect={(_, d) => setRole(d.optionValue || 'Staff')}>
              <Option value="Staff">Staff</Option>
              <Option value="Supervisor">Supervisor</Option>
              <Option value="Manager">Manager</Option>
            </Dropdown>
          </div>
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}