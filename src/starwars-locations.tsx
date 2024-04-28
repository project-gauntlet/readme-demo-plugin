import {ReactElement} from "react";
import {Grid} from "@project-gauntlet/api/components";
import {assetData} from "@project-gauntlet/api/helpers";

export default function StarWarsLocations(): ReactElement {
    const nabooImage = assetData("naboo.jpg");
    const dagobahImage = assetData("dagobah.jpg");
    const rylothImage = assetData("ryloth.jpg");
    const tatooineImage = assetData("tatooine.jpg");
    const deathstarImage = assetData("deathstar.jpg");
    const endorImage = assetData("endor.jpg");
    const coruscantImage = assetData("coruscant.jpg");
    const dathomirImage = assetData("dathomir.jpg");
    const dantooineImage = assetData("dantooine.jpg");

    return (
        <Grid>
            <Grid.Item id="naboo" title="Naboo">
                <Grid.Item.Content.Image source={{data: nabooImage}}/>
            </Grid.Item>
            <Grid.Item id="ryloth" title="Ryloth">
                <Grid.Item.Content.Image source={{data: rylothImage}}/>
            </Grid.Item>
            <Grid.Item id="tatooine" title="Tatooine">
                <Grid.Item.Content.Image source={{data: tatooineImage}}/>
            </Grid.Item>
            <Grid.Item id="dagobah" title="Dagobah">
                <Grid.Item.Content.Image source={{data: dagobahImage}}/>
            </Grid.Item>
            <Grid.Item id="coruscant" title="Coruscant">
                <Grid.Item.Content.Image source={{data: coruscantImage}}/>
            </Grid.Item>
            <Grid.Item id="endor" title="Endor">
                <Grid.Item.Content.Image source={{data: endorImage}}/>
            </Grid.Item>
            <Grid.Item id="deathstar" title="Death Star">
                <Grid.Item.Content.Image source={{data: deathstarImage}}/>
            </Grid.Item>
            <Grid.Item id="dathomir" title="Dathomir">
                <Grid.Item.Content.Image source={{data: dathomirImage}}/>
            </Grid.Item>
            <Grid.Item id="dantooine" title="Dantooine">
                <Grid.Item.Content.Image source={{data: dantooineImage}}/>
            </Grid.Item>
        </Grid>
    )
}
