declare module '@stomp/stompjs' {
  export interface IMessage {
    command: string;
    headers: Record<string, string>;
    body: string;
    ack: () => void;
    nack: () => void;
  }

  export interface StompSubscription {
    id: string;
    unsubscribe: () => void;
  }

  export interface PublishParams {
    destination: string;
    headers?: Record<string, string>;
    body?: string;
    binaryBody?: Uint8Array;
    skipContentLengthHeader?: boolean;
  }

  export interface ClientConfig {
    webSocketFactory?: () => WebSocket;
    brokerURL?: string;
    connectHeaders?: Record<string, string>;
    reconnectDelay?: number;
    heartbeatIncoming?: number;
    heartbeatOutgoing?: number;
    onConnect?: (frame?: unknown) => void;
    onDisconnect?: () => void;
    onStompError?: (frame: unknown) => void;
    onWebSocketError?: (event: unknown) => void;
    onWebSocketClose?: (event: CloseEvent) => void;
    debug?: (message: string) => void;
  }

  export class Client {
    connected: boolean;
    constructor(config?: ClientConfig);
    activate(): void;
    deactivate(): void;
    publish(params: PublishParams): void;
    subscribe(
      destination: string,
      callback: (message: IMessage) => void,
      headers?: Record<string, string>,
    ): StompSubscription;
  }
}
