import { css } from "@emotion/react";

export const tableCustomizeStyle = css`
  margin-top: 30px;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border: 1px solid rgba(255, 255, 255, 0.69);
  thead th {
    text-align: center !important;
  }
  tbody td {
    border: none !important;
    padding: 16px 20px !important;
    text-align: center !important;
  }
`;
