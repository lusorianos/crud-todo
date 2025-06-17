import LogoIcon from './assets/images/logo.svg?react'
import IconPlus from './assets/icons/plus-regular.svg?react'
import IconX from './assets/icons/x-regular.svg?react'
import IconCheck from './assets/icons/check-regular.svg?react'
import Badge from './components/badge'
import Icon from './components/icon'
import Text from './components/text'
import Button from './components/button'
import ButtonIcon from './components/button-icon'

export default function App() {

  return (
    <main className="pt-20">
      <section className="w-full max-w-lg min-h-44 mx-auto">
        <header className='mb-8'>
          <Icon svg={LogoIcon} />
        </header>
        <div className='flex justify-between items-center gap-6'>
          <div className='inline-flex items-center gap-2'>
            <Text variant="body-sm-bold" className='text-gray-300'>Tarefas criadas</Text>
            <Badge variant="secondary">0</Badge>
          </div>
          <div className='inline-flex items-center gap-2'>
            <Text variant="body-sm-bold" className='text-gray-300'>Concluídas</Text>
            <Badge variant="primary">0</Badge>
          </div>
        </div>
        <div className='mt-3'>
          <Button icon={IconPlus} className='w-full'>
            Nova Tarefa
          </Button>
        </div>
        <div className='w-full flex items-center justify-between gap-4 p-5 rounded bg-white shadow-sm'>
          <div></div>
          <div className='flex items-center gap-1'>
            <ButtonIcon variant="secondary" icon={IconX}/>
            <ButtonIcon icon={IconCheck}/>
          </div>
        </div>
      </section>
    </main>
  )
}