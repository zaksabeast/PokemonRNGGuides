import React from "react";
import { ConfigProvider } from "antd";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { getTheme } from "~/theme";
import { emotionTheme } from "./emotion";

// This controls things like a radiating glow animation when clicking buttons
const DISABLED_WAVE = { disabled: true };

const TAG_CONFIG = { variant: "outlined" } as const;

const TOOLTIP_CONFIG = {
  styles: {
    container: {
      color: "var(--ant-color-text)",
      // antd's default padding plus 4px
      padding:
        "calc(var(--ant-padding-sm) / 2 + 4px) calc(var(--ant-padding-xs) + 4px)",
      boxShadow:
        "0 2px 6px 0 rgb(0 0 0 / 0.16), 0 6px 20px 2px rgb(0 0 0 / 0.14)",
    },
  },
};

const SELECT_CONFIG = {
  styles: {
    popup: {
      root: {
        // The popup is the same color as cards, so shadows alone don't separate it in dark mode
        border: "1px solid var(--ant-color-border-secondary)",
      },
    },
  },
};

// Pickers render their background on the panel container rather than the popup root
const PICKER_CONFIG = {
  styles: {
    popup: {
      container: SELECT_CONFIG.styles.popup.root,
    },
  },
};

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const theme = getTheme();

  return (
    <EmotionThemeProvider theme={emotionTheme}>
      <ConfigProvider
        theme={theme}
        wave={DISABLED_WAVE}
        tooltip={TOOLTIP_CONFIG}
        tag={TAG_CONFIG}
        select={SELECT_CONFIG}
        datePicker={PICKER_CONFIG}
        timePicker={PICKER_CONFIG}
      >
        {children}
      </ConfigProvider>
    </EmotionThemeProvider>
  );
};
