"use client";

import React from "react";

import { cn, range } from "@/lib/utils";
import { LayoutGroup, motion } from "framer-motion";

import Card from "../Card";
import SliderControl from "../slider-control";
import styles from "./DivisionGroupsDemo.module.css";
import Equation from "./equation";

function DivisionGroupsDemo({
  numOfItems = 12,
  initialNumOfGroups = 1,
  includeRemainderArea,
}: {
  numOfItems: number;
  initialNumOfGroups: number;
  includeRemainderArea: boolean;
}) {
  const id = React.useId();
  const [numOfGroups, setNumOfGroups] = React.useState(initialNumOfGroups);

  const numOfItemsPerGroup = Math.floor(numOfItems / numOfGroups);

  const totalNumInGroups = numOfGroups * numOfItemsPerGroup;

  const remainder = includeRemainderArea ? numOfItems % numOfGroups : null;

  // When we're splitting into 1-3 groups, display side-by-side
  // columns. When we get to 4, it should switch to a 2x2 grid.
  const gridStructure =
    numOfGroups < 4
      ? {
          gridTemplateColumns: `repeat(${numOfGroups}, 1fr)`,
        }
      : {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        };

  return (
    <LayoutGroup>
      <Card as="section" className={styles.wrapper}>
        <header className={styles.header}>
          <SliderControl
            label="Number of Groups"
            className={styles.slider}
            step={1}
            min={1}
            max={4}
            value={numOfGroups}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
              setNumOfGroups(Number(ev.target.value))
            }
          />
        </header>

        <div className={styles.demoWrapper}>
          <div className={cn(styles.demoArea)} style={gridStructure}>
            {range(numOfGroups).map((groupIndex) => (
              <div key={groupIndex} className={styles.group}>
                {range(numOfItemsPerGroup).map((index) => {
                  const totalInPreviousGroups = groupIndex * numOfItemsPerGroup;
                  const layoutId = `${id}-${totalInPreviousGroups + index}`;
                  return (
                    <motion.div
                      key={layoutId}
                      layoutId={layoutId}
                      layout={true}
                      className={styles.item}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {includeRemainderArea && (
          <div className={styles.remainderArea}>
            <p className={styles.remainderHeading}>Remainder Area</p>

            {range(totalNumInGroups, numOfItems)
              .reverse()
              .map((index) => {
                const layoutId = `${id}-${index}`;
                return (
                  <motion.div
                    layoutId={layoutId}
                    key={layoutId}
                    className={styles.item}
                  />
                );
              })}
          </div>
        )}

        <Equation
          dividend={numOfItems}
          divisor={numOfGroups}
          remainder={remainder as number | undefined}
        />
      </Card>
    </LayoutGroup>
  );
}

export default DivisionGroupsDemo;
