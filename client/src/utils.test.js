import { describe,it,expect } from 'vitest';
import { displayStatus,isOpenAction,metricDelta } from './utils.js';
describe('workflow display helpers',()=>{
 it('formats API action states for people',()=>expect(displayStatus('IN_PROGRESS')).toBe('IN PROGRESS'));
 it('keeps resolved work out of the unresolved handover set',()=>{expect(isOpenAction('RESOLVED')).toBe(false);expect(isOpenAction('OVERDUE')).toBe(true)});
 it('calculates comparison change in percentage points',()=>expect(metricDelta(61,78)).toBe(17));
});
