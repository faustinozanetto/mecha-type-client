import React, { Fragment } from 'react';
import NextError, { ErrorProps as NextErrorProps } from 'next/error';

export type ErrorPageProps = {
  err: Error;
  statusCode: number;
  isReadyToRender: boolean;
  children?: React.ReactElement;
};

export type ErrorProps = {
  isReadyToRender: boolean;
} & NextErrorProps;

/**
 * We override the native Next.js _error page in order to
 * handle more use-cases, and display errors using our own error layout.
 * @param props
 */
const ErrorPage = (props: ErrorPageProps): JSX.Element => {
  const { statusCode, isReadyToRender, err, children = null } = props;
  if (process.env.NODE_ENV !== 'production') {
    console.debug('ErrorPage - Unexpected error caught, it was captured and sent to Sentry. Error details:');
    console.error(err);
  }
  return (
    <Fragment>
      {
        // Render the children if provided, or return the native NextError component from Next
        children ? (
          children
        ) : (
          <NextError
            statusCode={statusCode}
            // Only display title in non-production stages, to avoid leaking debug information to end-users
            // When "null" is provided, it'll fallback to Next.js default message (based on the statusCode)
            title={process.env.NEXT_PUBLIC_APP_STAGE !== 'production' ? err?.message : null}
          />
        )
      }
    </Fragment>
  );
};

export default ErrorPage;
