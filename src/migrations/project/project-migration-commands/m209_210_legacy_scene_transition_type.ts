import { rtp, RT, RecordFactory } from "../../../r/R";
import { IOrder } from "../../IOrder";
import { ProjectFactory } from "../../../r/recordFactories";
import { ProjectProperty } from "../../../r/recordTypes/Project";
import { pn } from "../../../r";

class Migration implements IOrder {
  execute (projectJson: any) {
    return migrateProject(projectJson);
  }
}

/**
 * For older projects set scene_transition_type to blend.
 * The new default value is fade_to_black - which is the new behaviour.
 * But so that older behaviour is maintained, we set this manually to blend for older projects
 */
const migrateProject = (json: any) => {
  const pf = new ProjectFactory(json);
  if(pf.get(ProjectProperty.scene_transition_type) === undefined) {
    pf.set(ProjectProperty.scene_transition_type, pn.SceneTransitionType.blend);
  }
  pf.set(rtp.project.version, 210);
  return json;
}

const migration = new Migration();
export default migration;
