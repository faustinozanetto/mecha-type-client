import * as React from 'react';
import { SystemProps } from '@chakra-ui/system';
import { StyledTable, StyledTableCell, StyledTableColumnHeader } from './style';

interface ITableContainerProps {
  overflow?: SystemProps['overflow'];
  overflowX?: SystemProps['overflowX'];
}

export interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement>, ITableContainerProps {}

export const TableContainer = React.forwardRef<HTMLDivElement, TableContainerProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div
      ref={ref}
      className={className}
      {...rest}
      style={{
        display: 'block',
        whiteSpace: 'nowrap',
        WebkitOverflowScrolling: 'touch',

        overflowY: 'hidden',
        maxWidth: '100%',
      }}
    />
  );
});
TableContainer.displayName = 'TableContainer';

interface ITableProps {}

export interface TableProps extends React.HTMLAttributes<HTMLTableElement>, ITableProps {}

export const Table = React.forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const { className, ...rest } = props;

  return <StyledTable role="table" ref={ref} className={className} {...rest} />;
});
Table.displayName = 'Table';

export interface ITableCaptionProps {
  /**
   * The placement of the table caption. This sets the `caption-side` CSS attribute.
   * @default "bottom"
   */
  placement?: 'top' | 'bottom';
}

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement>, ITableCaptionProps {}

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>((props, ref) => {
  const { placement = 'bottom', className, ...rest } = props;

  return <caption ref={ref} style={{ captionSide: placement }} className={className} {...rest} />;
});
TableCaption.displayName = 'TableCaption';

export interface ITableHeadProps {}

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement>, ITableCaptionProps {}

export const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>((props, ref) => {
  const { className, ...rest } = props;

  return <thead ref={ref} className={className} {...rest} />;
});
TableHead.displayName = 'TableHead';

export interface ITableBodyProps {}

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement>, ITableBodyProps {}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>((props, ref) => {
  const { className, ...rest } = props;

  return <tbody ref={ref} className={className} {...rest} />;
});
TableBody.displayName = 'TableBody';

export interface ITableColumnHeaderProps {
  /**
   * Aligns the cell content to the right
   */
  isNumeric?: boolean;
}

export interface TableColumnHeaderProps
  extends React.HTMLAttributes<HTMLTableHeaderCellElement>,
    ITableColumnHeaderProps {}

export const TableColumnHeader = React.forwardRef<HTMLTableHeaderCellElement, TableColumnHeaderProps>((props, ref) => {
  const { isNumeric, className, ...rest } = props;

  return <StyledTableColumnHeader ref={ref} data-is-numeric={isNumeric} className={className} {...rest} />;
});
TableColumnHeader.displayName = 'TableColumnHeader';

export interface ITableRowProps {}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement>, ITableRowProps {}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>((props, ref) => {
  const { className, ...rest } = props;

  return <tr ref={ref} role="row" className={className} {...rest} />;
});
TableRow.displayName = 'TableRow';

export interface ITableCellProps {
  /**
   * Aligns the cell content to the right
   */
  isNumeric?: boolean;
}

export interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement>, ITableCellProps {}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>((props, ref) => {
  const { isNumeric, className, ...rest } = props;

  return <StyledTableCell ref={ref} role="gridcell" data-is-numeric={isNumeric} className={className} {...rest} />;
});

TableCell.displayName = 'TableCell';
