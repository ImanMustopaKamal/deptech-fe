import { RxDotsHorizontal } from 'react-icons/rx'
import { Row } from '@tanstack/react-table'
import { TbTrash } from 'react-icons/tb'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useContext } from './context'
import { adminSchema } from './schema'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const admin = adminSchema.parse(row.original)

  const { setOpen, setCurrentRow } = useContext()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='data-[state=open]:bg-muted flex h-8 w-8 p-0'
        >
          <RxDotsHorizontal className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(admin)
            setOpen('update')
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <TbTrash size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(admin)
            setOpen('delete')
          }}
        >
          Delete
          <DropdownMenuShortcut>
            <TbTrash size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
