export interface Alert {
    content: string;
    type: 'info' | 'danger' | 'success' | 'warning';
    alive: number;
}
