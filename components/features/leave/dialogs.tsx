import { useContext } from './context'
import { ActionDialog } from './action-dialog'
import { DeleteDialog } from './delete-dialog'

export function Dialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useContext()
  return (
    <>
      <ActionDialog
        key='user-add'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      {currentRow && (
        <>
          <ActionDialog
            key={`user-edit-${currentRow.id}`}
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
            key={`user-delete-${currentRow.id}`}
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
