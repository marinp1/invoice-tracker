declare module 'aws-amplify-react';
declare module 'react-currency-input';
declare module 'react-toggle-button';

declare module 'lz-string' {
  export function compress(data: string): string;
  export function decompress(data: string): string;
  export function compressToUTF16(data: string): string;
  export function decompressFromUTF16(data: string): string;
  export function compressToBase64(data: string): string;
  export function decompressFromBase64(data: string): string;
  export function compressToEncodedURIComponent(data: string): string;
  export function decompressFromEncodedURIComponent(data: string): string;
}

declare module '@emotion/styled/macro' {
  import styled from '@emotion/styled';
  export * from '@emotion/styled';
  export default styled;
}

declare module '@emotion/css/macro' {
  import css from '@emotion/css';
  export * from '@emotion/css';
  export default css;
}
