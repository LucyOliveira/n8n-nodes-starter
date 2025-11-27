import type {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

export class Heritage implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Heritage',
		name: 'heritage',
		icon: { light: 'file:heritage.svg', dark: 'file:heritage.dark.svg' },
		group: [],
		version: 1,
		description: 'Heritage Node',
		defaults: {
			name: 'Heritage',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		properties: [
		],
	};

	
}
