/**
 * Renders a guage chart for ThoughtSpot BYOC.
 * This chart conforms to the ThoughtSpot SDK for BYOC (https://github.com/thoughtspot/ts-chart-sdk).
 */
import _ from "lodash";

import {
  ChartConfig,
  ChartConfigEditorDefinition,
  ChartModel,
  ChartToTSEvent,
  CustomChartContext,
  getChartContext,
  Query,
  ValidationResponse,
  VisualPropEditorDefinition,
} from "@thoughtspot/ts-chart-sdk";

// ------------------------------------------- Helper functions and types. -------------------------------------------

const logMessage = (msg: string, data: any = "") => {
  console.log(`BYOC Gauge: ${msg}`, data);
};

// ------------------------------------------- Chart functions. ------------------------------------------------------

/**
 * Returns the default chart config for the gauge chart type.
 * If there are numeric measures, the first one will be put on the Y column.  If there are attributes (non-numeric),
 * they will all be put on the X-axis in the order received.
 * @param chartModel A chart model (https://ts-chart-sdk-docs.vercel.app/interfaces/ChartModel.html)
 * @return An array of chart configs (https://ts-chart-sdk-docs.vercel.app/interfaces/ChartConfig.html)
 */
const getDefaultChartConfig = (chartModel: ChartModel): ChartConfig[] => {
  logMessage("getting default chart config", chartModel);

  const defaultChartConfig: ChartConfig = {
    key: "default",
    dimensions: [],
  };

  return [defaultChartConfig];
};

/**
 * Returns the axis configuration to be used by the user for configuring the chart axes.
 * @returns one or more chart config editor definitions. (https://ts-chart-sdk-docs.vercel.app/interfaces/ChartConfigEditorDefinition.html)
 */
const getChartConfigEditorDefinition = (): ChartConfigEditorDefinition[] => {
  logMessage("get chart config editor definition");

  const chartConfigEditorDefinition: ChartConfigEditorDefinition[] = [];
  return chartConfigEditorDefinition;
};

/**
 * Returns the visual properties editor definition for the chart, such as chart color settings.
 * @returns A visual property editior definition (https://ts-chart-sdk-docs.vercel.app/interfaces/VisualPropEditorDefinition.html)
 */
const getVisualPropEditorDefinition = (): VisualPropEditorDefinition => {
  logMessage("get visual prop editor definition");

  const visualPropEditorDefinition: VisualPropEditorDefinition = {
    elements: [],
  };
  return visualPropEditorDefinition;
};

/**
 * This function gets the queries based on the user configuration in the chart.
 * @param chartConfig An array of chart configurations (https://ts-chart-sdk-docs.vercel.app/interfaces/ChartConfig.html).
 * @returns An array of queries (https://ts-chart-sdk-docs.vercel.app/interfaces/Query.html).
 */
const getQueriesFromChartConfig = (
  chartConfig: ChartConfig[]
): Array<Query> => {
  logMessage("get queries from chart config: ", chartConfig);

  let queries: Array<Query> = [];

  logMessage("queries: ", queries);
  return queries;
};

/**
 * The chart can only have a measure (numeric) on the Y axis and attribute (non-numeric) on the X axis.
 * @param updatedConfig The config array from ThoughtSpot. (https://ts-chart-sdk-docs.vercel.app/interfaces/ChartConfig.html)
 * @param chartModel The chart model from ThoughtSpot. (https://ts-chart-sdk-docs.vercel.app/interfaces/ChartModel.html)
 */
const getValidateConfig = (
  updatedConfig: ChartConfig[],
  chartModel: ChartModel
): ValidationResponse => {
  logMessage("validating the chart config");
  logMessage("updatedConfig: ", updatedConfig);
  logMessage("chartModel: ", chartModel);

  const validationResponse: ValidationResponse = {
    isValid: true,
    validationErrorMessage: [],
  };
  return validationResponse;
};

/**
 * Performs the actual rendering of the chart using the charting library.
 * @param context The custom chart context (https://ts-chart-sdk-docs.vercel.app/interfaces/CustomChartContext.html)
 */
const _renderChart = async (context: CustomChartContext): Promise<void> => {
  logMessage("rendering chart", context);
};

/**
 * Manages the rendering of the chart.  There are three events that may be emitted to TS:
 * 1. RenderStart - (required) The rendering has started.
 * 2. RenderError - (if unsuccessful) There was an error rendering the chart.
 * 3. RenderComplete - (if successful) The rendering has completed.
 * @param context The custom chart context (https://ts-chart-sdk-docs.vercel.app/interfaces/CustomChartContext.html)
 */
const renderChart = async (context: CustomChartContext): Promise<void> => {
  try {
    await context.emitEvent(ChartToTSEvent.RenderStart); // tell TS we are starting.
    await _renderChart(context);
  } catch (e) {
    // Tell TS there was an error.
    await context.emitEvent(ChartToTSEvent.RenderError, {
      hasError: true,
      error: e,
    });
  } finally {
    // Tell TS we are done.
    await context.emitEvent(ChartToTSEvent.RenderComplete);
  }
};

// ------------------------------------------- Initialize and run the chart. ----------------------------------------------------

/**
 * Initializes the chart and then renders the chart.
 * See https://ts-chart-sdk-docs.vercel.app/functions/getChartContext.html.
 */
const init = async () => {
  logMessage("init called");

  // Standard init with required properties.
  const ctx = await getChartContext({
    getDefaultChartConfig: getDefaultChartConfig,
    validateConfig: getValidateConfig,
    getQueriesFromChartConfig: getQueriesFromChartConfig,
    renderChart: renderChart,
    chartConfigEditorDefinition: getChartConfigEditorDefinition(),
    visualPropEditorDefinition: getVisualPropEditorDefinition(),
  });
  logMessage("rendering");
  await renderChart(ctx);
};

logMessage("starting ...");
init();
