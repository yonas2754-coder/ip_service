"use client";

import * as React from 'react';
import {
  FluentProvider,
  teamsDarkTheme,
  SSRProvider,
  RendererProvider,
  createDOMRenderer,
  renderToStyleElements,
  BrandVariants, createLightTheme
} from '@fluentui/react-components';
import { useServerInsertedHTML } from 'next/navigation';
// SharePoint Blue Brand Ramp
const sharepointBrand: BrandVariants = { 
  10: "#020305", 20: "#111723", 30: "#16263D", 40: "#193253", 50: "#1B3F6A", 
  60: "#1B4C82", 70: "#18599B", 80: "#1267B4", 90: "#317AF7", 100: "#4F8CF8", 
  110: "#699EF9", 120: "#82AFFB", 130: "#9ABFFC", 140: "#B1CEFD", 150: "#C8DDFE", 160: "#DFEBFF" 
};

const theme = createLightTheme(sharepointBrand);

export function Providers({ children }: { children: React.ReactNode }) {
  const [renderer] = React.useState(() => createDOMRenderer());
  const didRenderRef = React.useRef(false);

  useServerInsertedHTML(() => {
    if (didRenderRef.current) {
      return;
    }
    didRenderRef.current = true;
    return <>{renderToStyleElements(renderer)}</>;
  });

  return (
    <RendererProvider renderer={renderer}>
      <SSRProvider>
        <FluentProvider theme={theme}>{children}</FluentProvider>
      </SSRProvider>
    </RendererProvider>
  );
}