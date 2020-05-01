import {
  ILoop,
  ELoopState,
} from './loop.interface';

export class Loop implements ILoop {
  private state: ELoopState;
  private callback: Function;
  private timer: NodeJS.Timer;

  // TODO: refactor using AsyncIterator to control types
  // private gen: GeneratorFunction;

  constructor(callback: Function) {
    this.state = ELoopState.STOPPED;
    // TODO: state transitions
    // TODO: changeState method

    this.callback = callback;
  }

  public async start(): Promise<void> {
    this.timer = setInterval(
      () => {
        this.callback();
      },
      0,
    );

    this.state = ELoopState.RUNNING;

    return;
  }

  public async stop(): Promise<void> {
    clearInterval(this.timer);

    this.state = ELoopState.STOPPED;

    return;
  }

  public async status(): Promise<ELoopState> {
    return this.state;
  }

}
