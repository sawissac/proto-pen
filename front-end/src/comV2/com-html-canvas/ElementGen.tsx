import React from 'react'
import { useAppDispatch, useAppSelector } from '../../logic/redux-store/hooks';
import { ComponentModel } from '../../logic/ComponentModel';
import { _arr_has } from '../../logic/proto_pen_method/proto_arr_extract';
import { MoveElement } from './MoveElement';
import { boxShadow } from '../../logic/theme/property';
import { setActiveElement } from '../../logic/redux-store/feature/ElementObjectSlice';
import { RecursiveElement } from './RecursiveElement';

function ElementGen() {
  const elementObjRedux = useAppSelector((state) => state.object);
  const dispatch = useAppDispatch();
  const activeElement = elementObjRedux.activeElement;
  const selectedElementList = _arr_has(elementObjRedux.selectedElement);

  const listOfElement = Object.values(
    elementObjRedux.elementObjectData
  ).filter((i) => i.type !== ComponentModel.nm);

  const normalElements = listOfElement
    .filter((i) => i.relationship.status === false)
    .sort((a, b) => b.layer - a.layer);

  const relationshipElements = listOfElement.filter(
    (i) => i.relationship.status === true
  );
  return (
    <React.Fragment>
      {normalElements.map((data: any, index) => {
          return (
            <MoveElement
              key={index}
              data={data}
              style={{
                boxShadow: boxShadow(
                  data.name === activeElement,
                  selectedElementList.has(data.name)
                ),
              }}
              listener={() => {
                dispatch(setActiveElement(data.name));
              }}
            />
          );
        })}
        {relationshipElements.map((data: any, index) => {
          return (
            <MoveElement
              key={index}
              data={data}
              style={{
                boxShadow: boxShadow(
                  data.name === activeElement,
                  selectedElementList.has(data.name)
                ),
              }}
              listener={() => {
                dispatch(setActiveElement(data.name));
              }}
            >
              <RecursiveElement data={data.relationship.children} />
            </MoveElement>
          );
        })}
    </React.Fragment>
  )
}

export default ElementGen