import { ReactElement } from "react";
import { Grid } from "@project-gauntlet/api/components";

export default function StarWarsLocations(): ReactElement {
    return (
        <Grid>
            <Grid.Item title="Naboo">
                <Grid.Item.Content>
                    <Grid.Item.Content.Image source={{ asset: "naboo.jpg" }}/>
                </Grid.Item.Content>
            </Grid.Item>
            <Grid.Item title="Ryloth">
                <Grid.Item.Content>
                    <Grid.Item.Content.Image source={{ asset: "dagobah.jpg" }}/>
                </Grid.Item.Content>
            </Grid.Item>
            <Grid.Item title="Tatooine">
                <Grid.Item.Content>
                    <Grid.Item.Content.Image source={{ asset: "ryloth.jpg" }}/>
                </Grid.Item.Content>
            </Grid.Item>
            <Grid.Item title="Dagobah">
                <Grid.Item.Content>
                    <Grid.Item.Content.Image source={{ asset: "tatooine.jpg" }}/>
                </Grid.Item.Content>
            </Grid.Item>
            <Grid.Item title="Coruscant">
                <Grid.Item.Content>
                    <Grid.Item.Content.Image source={{ asset: "deathstar.jpg" }}/>
                </Grid.Item.Content>
            </Grid.Item>
            <Grid.Item title="Endor">
                <Grid.Item.Content>
                    <Grid.Item.Content.Image source={{ asset: "endor.jpg" }}/>
                </Grid.Item.Content>
            </Grid.Item>
            <Grid.Item title="Death Star">
                <Grid.Item.Content>
                    <Grid.Item.Content.Image source={{ asset: "coruscant.jpg" }}/>
                </Grid.Item.Content>
            </Grid.Item>
            <Grid.Item title="Dathomir">
                <Grid.Item.Content>
                    <Grid.Item.Content.Image source={{ asset: "dathomir.jpg" }}/>
                </Grid.Item.Content>
            </Grid.Item>
            <Grid.Item title="Dantooine">
                <Grid.Item.Content>
                    <Grid.Item.Content.Image source={{ asset: "dantooine.jpg" }}/>
                </Grid.Item.Content>
            </Grid.Item>
        </Grid>
    )
}
