import { useEmployee } from './employee-context'
import { EmployeeActionDialog } from './employee-action-dialog'
import { EmployeeDeleteDialog } from './employee-delete-dialog'
// import { UsersInviteDialog } from './users-invite-dialog'

export function EmployeeDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useEmployee()
  return (
    <>
      <EmployeeActionDialog
        key='user-add'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      {/* <UsersInviteDialog
        key='user-invite'
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      /> */}

      {currentRow && (
        <>
          <EmployeeActionDialog
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

          <EmployeeDeleteDialog
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
