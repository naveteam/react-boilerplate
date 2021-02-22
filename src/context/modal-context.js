import React, { useCallback, useState, useMemo } from 'react'

import Button from 'components/Button'
import Modal from 'components/Modal'
import Row from 'components/Row'
import Loader from 'components/Loader'
import Text from 'components/Text'

const CONFIRMATION_TYPE = 'confirmation'
const ERROR_TYPE = 'error'
const SUCCESS_TYPE = 'success'

const ModalContext = React.createContext()

const ModalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [modalData, setModalData] = useState(null)

  const handleCloseModal = () => {
    if (modalData?.onClose) {
      modalData.onClose()
    }
    setModalData(null)
  }
  const handleOpenModal = newModalData => setModalData(newModalData)

  const handleConfirm = useCallback(async () => {
    setIsLoading(true)
    await modalData?.onConfirm()
    setIsLoading(false)
  }, [modalData])

  const isConfirmationType = useMemo(() => modalData?.type === CONFIRMATION_TYPE, [modalData])

  const switchBasedOnType = useCallback(
    cases => {
      switch (modalData?.type) {
        case CONFIRMATION_TYPE:
        default:
          return cases.confirmation
        case SUCCESS_TYPE:
          return cases.success
        case ERROR_TYPE:
          return cases.error
      }
    },
    [modalData]
  )

  const modalContent = useMemo(
    () => ({
      title: modalData?.title || switchBasedOnType({ confirmation: 'Confirmação', success: 'Sucesso!', error: 'Erro' }),
      content:
        modalData?.content ||
        switchBasedOnType({
          confirmation: 'Confirmação de ação',
          success: 'Ação realizada com sucesso!',
          error: 'Ocorreu um erro ao realizar a ação'
        }),
      closeTitle: modalData?.closeTitle || switchBasedOnType({ confirmation: 'Cancelar', success: 'Ok', error: 'Ok' })
    }),
    [modalData, switchBasedOnType]
  )

  return (
    <ModalContext.Provider value={{ handleOpenModal, handleCloseModal }}>
      {children}
      <Modal minWidth={300} isOpen={!!modalData}>
        <Text variant='big'>{modalContent.title}</Text>
        <Row>{modalContent.content}</Row>

        <Row justifyContent={!isConfirmationType ? 'center' : 'flex-start'} mt={10}>
          <Button
            width={isConfirmationType ? '50%' : '100%'}
            backgroundColor={modalData?.type === SUCCESS_TYPE ? 'green' : 'gray'}
            p={10}
            mr={isConfirmationType ? 3 : 0}
            onClick={handleCloseModal}
            fontWeight='bold'
          >
            {modalContent.closeTitle}
          </Button>
          {isConfirmationType && (
            <Button width='50%' backgroundColor='purple' fontWeight='bold' p={10} onClick={handleConfirm}>
              {isLoading ? <Loader /> : 'Confirmar'}
            </Button>
          )}
        </Row>
      </Modal>
    </ModalContext.Provider>
  )
}
const useModal = () => {
  const context = React.useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
export { ModalProvider, useModal }
