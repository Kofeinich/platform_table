import {Container} from "./container/Container";
import styles from './Layout.module.css';

export const Layout = ({
                           children,
                       }) => {
    return (
        <main className={styles.layout}>
            <Container>{children}</Container>
        </main>
    );
};