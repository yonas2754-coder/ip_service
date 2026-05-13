"use client";
import React, { useState, useMemo } from 'react';
import { 
  DataGrid, DataGridBody, DataGridRow, DataGridHeader, DataGridHeaderCell, DataGridCell,
  createTableColumn, Badge, Button, Title3, Title2, Text, makeStyles, tokens, 
  Divider, Toolbar, ToolbarButton, Avatar, Card, CardHeader, CardFooter, shorthands
} from '@fluentui/react-components';
// Corrected Icon Exports for Fluent UI v9
import { 
  ArrowDownloadRegular, FilterRegular, CheckmarkCircleRegular, 
  WarningRegular, DataTrendingRegular, TimerRegular, PeopleRegular, ArrowTrendingRegular 
} from '@fluentui/react-icons';
import { REGIONS, KPI_LIMITS } from '../lib/constants';

const useStyles = makeStyles({
  container: { display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: tokens.colorNeutralBackground2 },
  header: { padding: '20px 24px', backgroundColor: tokens.colorNeutralBackground1, ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2) },
  
  dashboardGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
    gap: '16px', 
    padding: '24px',
    '@media (max-width: 600px)': { padding: '12px' }
  },
  kpiCard: { backgroundColor: tokens.colorNeutralBackground1, ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2) },
  statValue: { fontSize: '28px', fontWeight: tokens.fontWeightBold, color: tokens.colorBrandForeground1 },
  
  trendSection: { 
    padding: '0 24px 24px 24px', 
    display: 'grid', 
    gridTemplateColumns: '2fr 1fr', 
    gap: '16px', 
    '@media (max-width: 900px)': { gridTemplateColumns: '1fr' } 
  },
  trendCard: { 
    padding: '16px', 
    backgroundColor: tokens.colorNeutralBackground1, 
    borderRadius: tokens.borderRadiusMedium, 
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2) 
  },
  barContainer: { display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px', padding: '10px 0' },
  bar: { width: '100%', backgroundColor: tokens.colorBrandBackground, borderRadius: '2px 2px 0 0' },

  gridContainer: { padding: '0 24px 24px 24px' },
  gridWrapper: { 
    overflowX: 'auto', 
    backgroundColor: tokens.colorNeutralBackground1, 
    borderRadius: tokens.borderRadiusMedium, 
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2) 
  },
  dataGrid: { minWidth: '1600px' },
  columnHeader: { fontWeight: tokens.fontWeightSemibold, fontSize: '12px' }
});

export default function ReportAnalysisPage() {
  const styles = useStyles();

  // Logic matches your Excel Logging data structure
  const [data] = useState([
    { id: '1', customer: 'ENAT-BANK-SC-Data-to-NBE-ETHSWITCH', type: 'Support', status: 'Solved/Completed', duration: 52, date: '03/05/2026', region: 'CAAZ', user: 'Abebe B.' },
    { id: '2', customer: 'vISP-Linkent Hakomal', type: 'Support', status: 'Solved/Completed', duration: 25, date: '03/05/2026', region: 'SAAZ', user: 'Sara T.' },
    { id: '3', customer: 'Global Computing Solution', type: 'Provisioning', status: 'Solved/Completed', duration: 35, date: '04/05/2026', region: 'EAAZ', user: 'Abebe B.' },
    { id: '4', customer: 'Zemen Bank HQ', type: 'Provisioning', status: 'Pending', duration: 12, date: '05/05/2026', region: 'CAAZ', user: 'Dawit L.' },
  ]);

  // Performance Logic based on 30m/45m constraints
  const stats = useMemo(() => {
    const solved = data.filter(d => d.status === 'Solved/Completed');
    const breaches = solved.filter(d => {
      const limit = d.type === 'Support' ? KPI_LIMITS.Support : KPI_LIMITS.Provisioning;
      return d.duration > limit;
    });
    const compliance = solved.length > 0 ? Math.round(((solved.length - breaches.length) / solved.length) * 100) : 0;
    const avgRes = solved.length > 0 ? Math.round(solved.reduce((acc, curr) => acc + curr.duration, 0) / solved.length) : 0;

    return { total: data.length, compliance, avgRes, breaches: breaches.length };
  }, [data]);

  const columns = [
    createTableColumn({ columnId: 'customer', renderHeaderCell: () => <span className={styles.columnHeader}>Customer</span>, renderCell: (i: any) => <Text weight="semibold">{i.customer}</Text> }),
    createTableColumn({ columnId: 'kpi', renderHeaderCell: () => <span className={styles.columnHeader}>KPI Performance</span>, renderCell: (i: any) => {
      const limit = i.type === 'Support' ? KPI_LIMITS.Support : KPI_LIMITS.Provisioning;
      return <Badge color={i.duration > limit ? 'danger' : 'success'} appearance="tint">{i.duration}m / {limit}m</Badge>
    }}),
    createTableColumn({ columnId: 'type', renderHeaderCell: () => <span className={styles.columnHeader}>Type</span>, renderCell: (i: any) => <Badge appearance="outline">{i.type}</Badge> }),
    createTableColumn({ columnId: 'region', renderHeaderCell: () => <span className={styles.columnHeader}>Region</span>, renderCell: (i: any) => i.region }),
    createTableColumn({ columnId: 'user', renderHeaderCell: () => <span className={styles.columnHeader}>Handled By</span>, renderCell: (i: any) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Avatar name={i.user} size={20} /><Text size={200}>{i.user}</Text></div>
    )}),
    createTableColumn({ columnId: 'date', renderHeaderCell: () => <span className={styles.columnHeader}>Report Date</span>, renderCell: (i: any) => i.date }),
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Title2>Workforce KPI & Trend Analysis</Title2>
        <Text block size={100} color={tokens.colorNeutralForeground4}>Real-time SLA monitoring and regional performance distribution</Text>
      </header>

      {/* KPI Overview Cards */}
      <div className={styles.dashboardGrid}>
        <Card className={styles.kpiCard}>
          <CardHeader 
            header={<Text weight="semibold">Compliance Rate</Text>} 
            description="On-time vs Total Solved" 
            action={<ArrowTrendingRegular />} 
          />
          <div className={styles.statValue}>{stats.compliance}%</div>
        </Card>

        <Card className={styles.kpiCard}>
          <CardHeader 
            header={<Text weight="semibold">Avg. Resolution</Text>} 
            description="Average minutes taken" 
            action={<TimerRegular />} 
          />
          <div className={styles.statValue}>{stats.avgRes}m</div>
        </Card>

        <Card className={styles.kpiCard}>
          <CardHeader 
            header={<Text weight="semibold">SLA Breaches</Text>} 
            description="Total over-limit tasks" 
            action={<WarningRegular color="red"/>} 
          />
          <div className={styles.statValue} style={{color: tokens.colorPaletteRedForeground1}}>{stats.breaches}</div>
        </Card>

        <Card className={styles.kpiCard}>
          <CardHeader 
            header={<Text weight="semibold">Active Staff</Text>} 
            description="Logged-in technicians" 
            action={<PeopleRegular />} 
          />
          <div className={styles.statValue}>4</div>
        </Card>
      </div>

      {/* Graphical Trend Section */}
      <div className={styles.trendSection}>
        <div className={styles.trendCard}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
            <Text weight="semibold"><DataTrendingRegular /> Regional Distribution</Text>
            <Badge color="important">Live Trend</Badge>
          </div>
          <div className={styles.barContainer}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '4px'}}>
               <div className={styles.bar} style={{height: '90%'}}></div>
               <Text size={100}>CAAZ</Text>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '4px'}}>
               <div className={styles.bar} style={{height: '50%'}}></div>
               <Text size={100}>SAAZ</Text>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '4px'}}>
               <div className={styles.bar} style={{height: '25%'}}></div>
               <Text size={100}>EAAZ</Text>
            </div>
          </div>
        </div>
        
        <div className={styles.trendCard}>
          <Text weight="semibold">System Health</Text>
          <div style={{marginTop: '20px', display: 'grid', gap: '10px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Text size={200}>On-Time Tasks</Text>
                <CheckmarkCircleRegular color="green" />
            </div>
            <Divider />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Text size={200}>Breached Tasks</Text>
                <WarningRegular color="red" />
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Data Table */}
      <div className={styles.gridContainer}>
        <div className={styles.gridWrapper}>
          <div className={styles.dataGrid}>
            <DataGrid items={data} columns={columns}>
              <DataGridHeader>
                <DataGridRow>{({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}</DataGridRow>
              </DataGridHeader>
              <DataGridBody>
                {({ item }) => <DataGridRow>{({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}</DataGridRow>}
              </DataGridBody>
            </DataGrid>
          </div>
        </div>
      </div>
    </div>
  );
}