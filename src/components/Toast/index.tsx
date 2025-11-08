import { Toast as ToastBootstrap } from 'react-bootstrap'

interface IProps {
    show: boolean;
    message: string;
    colors?: string;
    onClose: () => void;
}

export const Toast = (props: IProps) => {

    return (
        <ToastBootstrap
            onClose={props.onClose}
            show={props.show}
            delay={3000}
            bg={props?.colors ? props.colors : 'danger'}
            autohide
            style={{
                position: 'absolute',
                zIndex: 99,
                right: 0
            }}
        >
            <ToastBootstrap.Body
                style={{ color: '#FFF' }}
            >
                {props.message}
            </ToastBootstrap.Body>

        </ToastBootstrap>
    )
}