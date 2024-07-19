import { NavLink } from 'react-router-dom'
import ARROW_LEFT from '../../assets/arrow-left.svg'
import EDIT from '../../assets/edit.svg'
import { Button } from '../Button/Button'
import styles from '../Buttons/Buttons.module.css'

export const Buttons = ({ isFormShown, onClickSave, disabled, onClickEdit }) => {
	return (
		<div className={styles.buttons}>
			<NavLink to='/'>
				<Button isImg={true} src={ARROW_LEFT}>
					GO BACK
				</Button>
			</NavLink>
			{isFormShown && <Button onClick={onClickSave}>SAVE</Button>}
			{!isFormShown && (
				<Button isImg={true} src={EDIT} onClick={onClickEdit} disabled={disabled}>
					EDIT PARAMETERS
				</Button>
			)}
		</div>
	)
}
