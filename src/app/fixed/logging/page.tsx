"use client";
import React, { useState, useEffect } from 'react';
import { 
  DataGrid, DataGridBody, DataGridRow, DataGridHeader, DataGridHeaderCell, DataGridCell,
  createTableColumn, Badge, Button, Drawer, DrawerHeader, DrawerBody, Field, Input, Select, 
  Title3, Text, makeStyles, tokens, Divider, Toolbar, ToolbarButton, Avatar, Tooltip,
  shorthands, PresenceBadge
} from '@fluentui/react-components';
import { 
  AddRegular, ArrowDownloadRegular, FilterRegular, TimerRegular, 
  CheckmarkCircleRegular, PersonRegular, MoreHorizontalRegular 
} from '@fluentui/react-icons';
import { SPECIFIC_REQUESTS, REGIONS, STATUS_OPTIONS, REQ_METHODS, REQ_TYPES, KPI_LIMITS } from '../lib/constants';

const useStyles = makeStyles({
  container: { display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: tokens.colorNeutralBackground2 },
  header: { padding: '12px 24px', backgroundColor: tokens.colorNeutralBackground1, ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2) },
  toolbar: { padding: '4px 24px', backgroundColor: tokens.colorNeutralBackground1, ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2) },
  
  // THE KEY FOR HORIZONTAL SCROLLING
  gridWrapper: { 
    overflowX: 'auto', // Enable horizontal scroll
    overflowY: 'auto', // Enable vertical scroll
    backgroundColor: tokens.colorNeutralBackground1, 
    flexGrow: 1,
    ...shorthands.margin('0', '0', '0', '0'),
  },
  
  // Set a minimum width for the table to force scrolling on small screens
  dataGrid: {
    minWidth: '1500px', 
  },

  columnHeader: { fontWeight: tokens.fontWeightSemibold, fontSize: '12px', color: tokens.colorNeutralForeground2 },
  metaText: { color: tokens.colorNeutralForeground4, fontSize: '11px', display: 'block' },
  timerActive: { color: tokens.colorBrandForeground1, fontWeight: tokens.fontWeightBold },
  kpiBreach: { color: tokens.colorPaletteRedForeground1, fontWeight: tokens.fontWeightBold },
  kpiSuccess: { color: tokens.colorPaletteGreenForeground1, fontWeight: tokens.fontWeightBold }
});

export default function EnterpriseLoggingPage() {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000); // Update live timer
    return () => clearInterval(interval);
  }, []);

  const [tasks] = useState([
    { 
      id: '1', registeredBy: 'Abebe B.', date: '03/05/2026', customer: 'ENAT-BANK-SC-Data-to-NBE-ETHSWITCH', 
      serviceNum: '9990023902', ipAddress: '10.131.207.186', reqType: 'Support', reqMethod: 'Email',
      specificReq: 'CPE Issue(Down/Config)', status: 'Solved/Completed', bw: '10', region: 'CAAZ',
      remarks: 'Customer Side Config problem', startTime: new Date(new Date().getTime() - 52 * 60000), endTime: new Date()
    },
    { 
      id: '2', registeredBy: 'Sara T.', date: '03/05/2026', customer: 'vISP-Linkent Hakomal', 
      serviceNum: 'XXXXXXXXX', ipAddress: 'L2VPN', reqType: 'Support', reqMethod: 'TT',
      specificReq: 'CPE Issue(Down/Config)', status: 'Pending', bw: '20', region: 'SAAZ',
      remarks: 'Config loss troubleshooting', startTime: new Date(new Date().getTime() - 15 * 60000), endTime: null
    }
  ]);

  const getDuration = (t: any) => {
    const end = t.status === 'Solved/Completed' ? new Date(t.endTime) : now;
    return Math.floor((end.getTime() - new Date(t.startTime).getTime()) / 60000);
  };

  const columns = [
    createTableColumn({ columnId: 'audit', renderHeaderCell: () => <span className={styles.columnHeader}>Registered By</span>, renderCell: (t: any) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Avatar name={t.registeredBy} size={24} icon={<PersonRegular />} />
        <Text size={200}>{t.registeredBy}</Text>
      </div>
    )}),
    createTableColumn({ columnId: 'kpi', renderHeaderCell: () => <span className={styles.columnHeader}>Time Taken (KPI)</span>, renderCell: (t: any) => {
      const mins = getDuration(t);
      const limit = t.reqType === 'Support' ? KPI_LIMITS.Support : KPI_LIMITS.Provisioning;
      const isSolved = t.status === 'Solved/Completed';
      const isOver = mins > limit;
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {isSolved ? <CheckmarkCircleRegular style={{ color: isOver ? 'red' : 'green' }} /> : <PresenceBadge status="busy" />}
          <Text className={isSolved ? (isOver ? styles.kpiBreach : styles.kpiSuccess) : styles.timerActive}>{mins}m / {limit}m</Text>
        </div>
      );
    }}),
    createTableColumn({ columnId: 'date', renderHeaderCell: () => <span className={styles.columnHeader}>Date</span>, renderCell: (t: any) => t.date }),
    createTableColumn({ columnId: 'customer', renderHeaderCell: () => <span className={styles.columnHeader}>Customer Name</span>, renderCell: (t: any) => <Text weight="semibold">{t.customer}</Text> }),
    createTableColumn({ columnId: 'service', renderHeaderCell: () => <span className={styles.columnHeader}>Service Num</span>, renderCell: (t: any) => t.serviceNum }),
    createTableColumn({ columnId: 'ip', renderHeaderCell: () => <span className={styles.columnHeader}>IP Address</span>, renderCell: (t: any) => t.ipAddress }),
    createTableColumn({ columnId: 'type', renderHeaderCell: () => <span className={styles.columnHeader}>Req Type</span>, renderCell: (t: any) => t.reqType }),
    createTableColumn({ columnId: 'method', renderHeaderCell: () => <span className={styles.columnHeader}>Method</span>, renderCell: (t: any) => t.reqMethod }),
    createTableColumn({ columnId: 'specific', renderHeaderCell: () => <span className={styles.columnHeader}>Specific Request</span>, renderCell: (t: any) => t.specificReq }),
    createTableColumn({ columnId: 'status', renderHeaderCell: () => <span className={styles.columnHeader}>Status</span>, renderCell: (t: any) => <Badge appearance="filled">{t.status}</Badge> }),
    createTableColumn({ columnId: 'bw', renderHeaderCell: () => <span className={styles.columnHeader}>BW</span>, renderCell: (t: any) => t.bw }),
    createTableColumn({ columnId: 'region', renderHeaderCell: () => <span className={styles.columnHeader}>Region</span>, renderCell: (t: any) => t.region }),
    createTableColumn({ columnId: 'remarks', renderHeaderCell: () => <span className={styles.columnHeader}>Remarks</span>, renderCell: (t: any) => t.remarks }),
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Title3 block>IP Service Advanced Daily Report</Title3>
        <Text size={100} color={tokens.colorNeutralForeground4}>Workforce Accountability & SLA Monitor</Text>
      </header>

      <Toolbar className={styles.toolbar}>
        <Button appearance="primary" icon={<AddRegular />} onClick={() => setIsOpen(true)}>New Record</Button>
        <Button icon={<ArrowDownloadRegular />}>Excel Report</Button>
        <ToolbarButton icon={<FilterRegular />}>Filter</ToolbarButton>
      </Toolbar>

      <div className={styles.gridWrapper}>
        <div className={styles.dataGrid}>
          <DataGrid items={tasks} columns={columns} focusMode="composite">
            <DataGridHeader>
              <DataGridRow>{({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}</DataGridRow>
            </DataGridHeader>
            <DataGridBody>
              {({ item }) => <DataGridRow>{({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}</DataGridRow>}
            </DataGridBody>
          </DataGrid>
        </div>
      </div>

      <Drawer position="end" open={isOpen} onOpenChange={() => setIsOpen(false)} size="medium">
        <DrawerHeader>Add Daily Report Entry</DrawerHeader>
        <DrawerBody>
          <div style={{ display: 'grid', gap: '12px', marginTop: '10px' }}>
            <Field label="Date (dd/mm/yyyy)" required><Input placeholder="03/05/2026" /></Field>
            <Field label="Customer Name" required><Input /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <Field label="Service Num"><Input /></Field>
              <Field label="IP Address"><Input /></Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <Field label="Req Type"><Select>{REQ_TYPES.map(o => <option key={o}>{o}</option>)}</Select></Field>
              <Field label="Method"><Select>{REQ_METHODS.map(o => <option key={o}>{o}</option>)}</Select></Field>
            </div>
            <Field label="Specific Request"><Select>{SPECIFIC_REQUESTS.map(o => <option key={o}>{o}</option>)}</Select></Field>
            <Field label="Status"><Select>{STATUS_OPTIONS.map(o => <option key={o}>{o}</option>)}</Select></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <Field label="BW (Mbps)"><Input type="number" /></Field>
              <Field label="Region"><Select>{REGIONS.map(o => <option key={o}>{o}</option>)}</Select></Field>
            </div>
            <Field label="Remarks"><Input /></Field>
            <Button appearance="primary" onClick={() => setIsOpen(false)} style={{ marginTop: '20px' }}>Start Task</Button>
          </div>
        </DrawerBody>
      </Drawer>
    </div>
  );
}