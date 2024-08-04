import { ReactElement } from "react";
import { Grid } from "@project-gauntlet/api/components";

export default function StarWarsLocations(): ReactElement {
    return (
        <Grid>
            <Grid.Item id="naboo" title="Naboo">
                <Grid.Item.Content.Image source={{ asset: "naboo.jpg" }}/>
            </Grid.Item>
            <Grid.Item id="ryloth" title="Ryloth">
                <Grid.Item.Content.Image source={{ asset: "dagobah.jpg" }}/>
            </Grid.Item>
            <Grid.Item id="tatooine" title="Tatooine">
                <Grid.Item.Content.Image source={{ asset: "ryloth.jpg" }}/>
            </Grid.Item>
            <Grid.Item id="dagobah" title="Dagobah">
                <Grid.Item.Content.Image source={{ asset: "tatooine.jpg" }}/>
            </Grid.Item>
            <Grid.Item id="coruscant" title="Coruscant">
                <Grid.Item.Content.Image source={{ asset: "deathstar.jpg" }}/>
            </Grid.Item>
            <Grid.Item id="endor" title="Endor">
                <Grid.Item.Content.Image source={{ asset: "endor.jpg" }}/>
            </Grid.Item>
            <Grid.Item id="deathstar" title="Death Star">
                <Grid.Item.Content.Image source={{ asset: "coruscant.jpg" }}/>
            </Grid.Item>
            <Grid.Item id="dathomir" title="Dathomir">
                <Grid.Item.Content.Image source={{ asset: "dathomir.jpg" }}/>
            </Grid.Item>
            <Grid.Item id="dantooine" title="Dantooine">
                <Grid.Item.Content.Image source={{ asset: "dantooine.jpg" }}/>
            </Grid.Item>
        </Grid>
    )
}
