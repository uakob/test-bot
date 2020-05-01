import {
  Tracer,
  Span,
  // SpanOptions,
} from 'opentracing';

import {
  TracingConfig,
  TracingOptions,
} from 'jaeger-client';

export interface ITracer extends Tracer {
  // NOTE: delegate or declare here?
  // startSpan(name: string, options?: SpanOptions): Span;
  // stopSpan(): Span;
}

export interface ITracerService {
  getTracer(): ITracer;
}

export interface ISpan extends Span {}
