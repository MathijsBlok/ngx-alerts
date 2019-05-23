export interface Alert {
    content: string | { html: string };
    type: 'warning' | 'danger' | 'info' | 'success';
}
