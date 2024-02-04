import { Grid } from "@nextui-org/react";
import {
    ReactElement,
    JSXElementConstructor,
    ReactFragment,
    ReactPortal,
} from "react";

export default function Center(props: {
    classes?: string | undefined;
    children?:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | ReactFragment
        | ReactPortal
        | null
        | undefined;
}) {
    return (
        <>
            <Grid.Container justify="center" className={props.classes}>
                {props.children}
            </Grid.Container>
        </>
    );
}
