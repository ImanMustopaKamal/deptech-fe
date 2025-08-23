import { useContext } from './context'
import { ActionDialog } from './action-dialog'
import { DeleteDialog } from './delete-dialog'

export function Dialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useContext()
  return (
    <>
      <ActionDialog
        key='admin-add'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      {currentRow && (
        <>
          <ActionDialog
            key={`admin-edit-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <DeleteDialog
            key={`admin-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
