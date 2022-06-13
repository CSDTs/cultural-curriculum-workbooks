import React from 'react';
import Application from './Application';
import { motion, AnimatePresence } from "framer-motion";


function ItemList({ filtered }) {
    return (
        <motion.div layout className={`applications`}>
            <AnimatePresence>
                {filtered.map((app) => (
                    <Application {...app} key={app.name} />
                ))}
            </AnimatePresence>
        </motion.div>
    );
}

export default ItemList;