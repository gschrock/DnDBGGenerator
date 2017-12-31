import * as actionCreators from '../actions/familyAndFriendsActionCreators.js';
import { family } from '../utils/origins/familyAndFriends/family.js';
import { absentParentFate } from '../utils/origins/familyAndFriends/absentParentFate.js';
import { familyLifestyle } from '../utils/origins/familyAndFriends/familyLifestyle.js';
import { childhoodHome } from '../utils/origins/familyAndFriends/childhoodHome.js';
import { childhoodMemories } from '../utils/origins/familyAndFriends/childhoodMemories.js';
import { alignment } from '../utils/supplemental/alignment.js';
import { occupation } from '../utils/supplemental/occupation.js';
import { attitude } from '../utils/supplemental/attitude.js';
import { race } from '../utils/supplemental/race.js';
import { supplementalClass } from '../utils/supplemental/supplementalClass.js';
import Roll from 'roll';
import Immutable from 'immutable';

const roll = new Roll();

export function getFamilyAndFriends(charismaModifierInput) {
  return function(dispatch, getState) {
    const familyResult = family();
    const familyString = getState().getIn(['core', 'rollInfo', 'Origins', 'Family and Friends', 'Family', familyResult]);
    dispatch(actionCreators.familyResult({ family: { familyString, familyKey: familyResult } }));

    const absentParentFateOneResult = absentParentFate();
    const absentParentFateOneString = getState().getIn(['core', 'rollInfo', 'Origins', 'Family and Friends', 'Absent Parent Fate', absentParentFateOneResult]);
    dispatch(actionCreators.absentParentFateResult({ absentParentFate: absentParentFateOneString, parent: 1 }));

    const absentParentFateTwoResult = absentParentFate();
    const absentParentFateTwoString = getState().getIn(['core', 'rollInfo', 'Origins', 'Family and Friends', 'Absent Parent Fate', absentParentFateTwoResult]);
    dispatch(actionCreators.absentParentFateResult({ absentParentFate: absentParentFateTwoString, parent: 2 }));

    const childhoodHomeResult = childhoodHome(familyLifestyle());
    const childhoodHomeString = getState().getIn(['core', 'rollInfo', 'Origins', 'Family and Friends', 'Childhood Home', childhoodHomeResult]);
    dispatch(actionCreators.childhoodHomeResult({ childhoodHome: childhoodHomeString }));

    const childhoodMemoriesResult = childhoodMemories(charismaModifierInput);
    const childhoodMemoriesString = getState().getIn(['core', 'rollInfo', 'Origins', 'Family and Friends', 'Childhood Memories', childhoodMemoriesResult]);
    dispatch(actionCreators.childhoodMemoriesResult({ childhoodMemories: childhoodMemoriesString }));

    const familyOccupation = occupation();
    const familyOccupationString = getState().getIn(['core', 'rollInfo', 'Supplemental Tables', 'Occupation', familyOccupation]);
    dispatch(actionCreators.familyOccupationResult({ familyOccupation: familyOccupationString }));

    const familyAlignment = alignment();
    let familyAlignmentString = '';
    const fiftyPercent = roll.roll('d2').result;
    if (familyAlignment === '3') {
      familyAlignmentString = fiftyPercent === 1 ? 'Chaotic evil' : 'Chaotic neutral';
    }

    else if (familyAlignment === '1617') {
      familyAlignmentString = fiftyPercent === 1 ? 'Lawful good' : 'Lawful neutral';
    }

    else if (familyAlignment === '18') {
      familyAlignmentString = fiftyPercent === 1 ? 'Chaotic good' : 'Chaotic neutral';
    }

    else {
      familyAlignmentString = getState().getIn(['core', 'rollInfo', 'Supplemental Tables', 'Alignment', familyAlignment]);
    }

    dispatch(actionCreators.familyAlignmentResult({ familyAlignment: familyAlignmentString }));

    const raceResult = race();
    const raceString = getState().getIn(['core', 'rollInfo', 'Supplemental Tables', 'Race', raceResult]);
    dispatch(actionCreators.raceResult({ race: raceString }));

    const familyAttitude = attitude();
    const familyAttitudeString = getState().getIn(['core', 'rollInfo', 'Supplemental Tables', 'Attitude', familyAttitude]);
    dispatch(actionCreators.familyAttitudeResult({ familyAttitude: familyAttitudeString }));

    const familyClass = supplementalClass();
    const familyClassString = getState().getIn(['core', 'rollInfo', 'Supplemental Tables', 'Class', familyClass]);
    dispatch(actionCreators.familyClassResult({ familyClass: familyClassString }));
  };
};
