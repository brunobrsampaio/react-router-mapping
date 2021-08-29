import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Switch } from 'react-router-dom';

const MappingContext = createContext(false);

export const useMappingContext = () => useContext(MappingContext);

/**
 * Contexto do agrupador
 */
const MappingProvider = ({ children, ...rest }) => {

    const routes = useRef({}).current;
    const elements = useRef([]).current;

    const [ update, setUpdate ] = useState(false);

    useEffect(() => {

        setUpdate(!update);
    }, []);

    return (
        <MappingContext.Provider value={{ routes, elements, ...rest }}>
            { children }
        </MappingContext.Provider>
    );
};

const Mapping = ({ children }) => {

    return (
        <MappingProvider>
            <MappingContext.Consumer>
                { ({ elements }) => (
                    <>
                        {
                            !elements.length ? (
                                <>
                                    { children }
                                </>
                            ) : (
                                <Switch>
                                    { elements }
                                </Switch>
                            )
                        }
                    </>
                ) }
            </MappingContext.Consumer>
        </MappingProvider>
    );
};

Mapping.displayName = 'Mapping';

export default Mapping;