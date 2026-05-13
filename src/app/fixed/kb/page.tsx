"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  Title2, Text, makeStyles, tokens, shorthands, Input, Button, Badge,
  Card, CardHeader, Divider, Avatar, PresenceBadge, Drawer,
  DrawerHeader, DrawerBody, Tab, TabList
} from '@fluentui/react-components';
import { 
  SearchRegular, SendRegular, BotRegular, SparkleRegular, 
  HistoryRegular, LightbulbCheckmarkRegular, ChatRegular, 
  DismissRegular, BookSearchRegular
} from '@fluentui/react-icons';
import { SAMPLE_KB_DATA, KBArticle } from './kbData';

const useStyles = makeStyles({
  container: { 
    display: 'flex', 
    height: '100vh', 
    backgroundColor: tokens.colorNeutralBackground2, 
    overflow: 'hidden' 
  },
  
  // Left Side: Documentation Library
  kbSection: { 
    flexGrow: 1, 
    overflowY: 'auto', 
    padding: '24px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '20px' 
  },
  
  // Right Side: Fixed Chat Sidebar
  chatSidebar: { 
    width: '400px', 
    backgroundColor: tokens.colorNeutralBackground1, 
    ...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralStroke2),
    display: 'flex', 
    flexDirection: 'column',
    '@media (max-width: 1024px)': { display: 'none' } 
  },

  // Chat UI Styles
  chatHeader: { 
    padding: '16px', 
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2), 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px' 
  },
  chatMessages: { 
    flexGrow: 1, 
    overflowY: 'auto', 
    padding: '16px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '12px' 
  },
  chatInputArea: { 
    padding: '16px', 
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2) 
  },
  
  bubble: { 
    padding: '10px 14px', 
    borderRadius: tokens.borderRadiusMedium, 
    fontSize: '13px', 
    maxWidth: '85%',
    lineHeight: '1.4'
  },
  aiBubble: { 
    backgroundColor: tokens.colorNeutralBackground2, 
    alignSelf: 'flex-start', 
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2) 
  },
  userBubble: { 
    backgroundColor: tokens.colorBrandBackground2, 
    color: tokens.colorBrandForeground2, 
    alignSelf: 'flex-end' 
  },
  
  cardGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
    gap: '16px' 
  },
  
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  
  mobileFab: {
    position: 'fixed', 
    bottom: '24px', 
    right: '24px', 
    '@media (min-width: 1025px)': { display: 'none' }
  }
});

/**
 * 1. SUB-COMPONENT DECLARED OUTSIDE MAIN RENDER
 * This prevents the "Cannot create components during render" error.
 */
interface ChatProps {
  messages: { role: string; text: string }[];
  chatInput: string;
  setChatInput: (val: string) => void;
  onSend: () => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  styles: any;
}

const ChatInterface = ({ messages, chatInput, setChatInput, onSend, scrollRef, styles }: ChatProps) => (
  <>
    <div className={styles.chatHeader}>
      <Avatar icon={<BotRegular />} color="brand" />
      <div>
        <Text weight="semibold" block>History Assistant</Text>
        <Badge size="small" color="success" appearance="tint">LLM Active</Badge>
      </div>
    </div>
    
    <div className={styles.chatMessages}>
      {messages.map((m, i) => (
        <div key={i} className={`${styles.bubble} ${m.role === 'ai' ? styles.aiBubble : styles.userBubble}`}>
          {m.role === 'ai' && (
            <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <SparkleRegular fontSize={14} color={tokens.colorBrandForeground1} />
              <Text size={100} weight="bold">Log Insights</Text>
            </div>
          )}
          {m.text}
        </div>
      ))}
      <div ref={scrollRef as any} />
    </div>

    <div className={styles.chatInputArea}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Input 
          placeholder="Ask about past cases..." 
          style={{ flexGrow: 1 }} 
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
        />
        <Button appearance="primary" icon={<SendRegular />} onClick={onSend} />
      </div>
    </div>
  </>
);

/**
 * 2. MAIN COMPONENT
 */
export default function KnowledgeBasePage() {
  const styles = useStyles();
  
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "I've analyzed the last 30 days of Excel logs. I see frequent 'vISP' issues in CAAZ. How can I assist?" }
  ]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMsg = { role: 'user', text: chatInput };
    setMessages(prev => [...prev, userMsg]);
    setChatInput("");

    // Simulate LLM Processing History
    setTimeout(() => {
      let botResponse = "Based on history, check the physical link status.";
      if (chatInput.toLowerCase().includes("bgp")) {
        botResponse = "SOP Match: For BGP issues in SAAZ, verify the AS Number mismatch. SLA target is 45m.";
      }
      setMessages(prev => [...prev, { role: 'ai', text: botResponse }]);
    }, 800);
  };

  return (
    <div className={styles.container}>
      {/* LEFT: KB DOCUMENTATION */}
      <section className={styles.kbSection}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title2>Knowledge Base</Title2>
          <Badge icon={<HistoryRegular />} appearance="tint">v1.2 Updated</Badge>
        </div>

        <Input 
          size="large" 
          contentBefore={<SearchRegular />} 
          placeholder="Search by Request Type (BGP, vISP, CPE)..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <TabList defaultSelectedValue="all">
          <Tab value="all">All Specs</Tab>
          <Tab value="sop">SOPs</Tab>
          <Tab value="history">Past Fixes</Tab>
        </TabList>

        <div className={styles.cardGrid}>
          {SAMPLE_KB_DATA.map((article: KBArticle) => (
            <Card key={article.id} className={styles.card}>
              <CardHeader 
                header={<Text weight="bold">{article.title}</Text>} 
                description={<Badge size="small" appearance="outline">{article.slaTarget}m SLA</Badge>}
                action={<LightbulbCheckmarkRegular />}
              />
              <Text size={200} block italic>{article.excelMapping}</Text>
              <Divider style={{ margin: '8px 0' }} />
              <Button appearance="subtle" icon={<BookSearchRegular />}>Read Procedure</Button>
            </Card>
          ))}
        </div>
      </section>

      {/* RIGHT: DESKTOP SIDEBAR CHAT */}
      <aside className={styles.chatSidebar}>
        <ChatInterface 
          messages={messages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          onSend={handleSendMessage}
          scrollRef={chatEndRef}
          styles={styles}
        />
      </aside>

      {/* MOBILE: FLOATING CHAT BUTTON */}
      <Button 
        shape="circular" size="large" appearance="primary" 
        icon={<ChatRegular />} className={styles.mobileFab}
        onClick={() => setIsDrawerOpen(true)}
      >
        Ask Assistant
      </Button>

      {/* MOBILE: CHAT DRAWER */}
      <Drawer 
        position="end" 
        open={isDrawerOpen} 
        onOpenChange={(_, { open }) => setIsDrawerOpen(open)}
        size="medium"
      >
        <DrawerHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Text weight="semibold">AI Assistant</Text>
            <Button appearance="subtle" icon={<DismissRegular />} onClick={() => setIsDrawerOpen(false)} />
          </div>
        </DrawerHeader>
        <DrawerBody style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
          <ChatInterface 
            messages={messages}
            chatInput={chatInput}
            setChatInput={setChatInput}
            onSend={handleSendMessage}
            scrollRef={chatEndRef}
            styles={styles}
          />
        </DrawerBody>
      </Drawer>
    </div>
  );
}